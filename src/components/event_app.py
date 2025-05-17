from flask import Flask, request, jsonify
import json
import os
import uuid
from event_clash_detector import build_event_graph, detect_clashes_dfs

app = Flask(__name__)
EVENTS_FILE = 'events.json'

# Create the events.json file if it doesn't exist
if not os.path.exists(EVENTS_FILE):
    with open(EVENTS_FILE, 'w') as f:
        json.dump([], f)

@app.route('/events', methods=['POST'])
def add_event():
    event = request.json
    print("Received event:", event)

    with open(EVENTS_FILE, 'r') as f:
        events = json.load(f)

    # Assign a unique ID to the new event
    event['id'] = str(uuid.uuid4())
    events.append(event)

    # Save the new event to file
    with open(EVENTS_FILE, 'w') as f:
        json.dump(events, f, indent=4)

    # Build event graph from updated list
    G = build_event_graph(events)
    print("Graph:", G)

    # Run DFS from all events to check for clashes
    conflict = False
    clash_chain = []

    for eid in G:
        conflict, clash_chain = detect_clashes_dfs(G, eid, set(), [])
        if conflict:
            break

    if conflict:
        print("Conflict detected with chain:", clash_chain)
        return jsonify({'message': 'Event added with conflict', 'clash_chain': clash_chain}), 409
    else:
        return jsonify({'message': 'Event added successfully'}), 201

@app.route('/events', methods=['GET'])
def get_events():
    with open(EVENTS_FILE, 'r') as f:
        events = json.load(f)
    return jsonify(events)

@app.route('/check-clash/<event_id>', methods=['GET'])
def check_event_clash(event_id):
    with open(EVENTS_FILE, 'r') as f:
        events = json.load(f)

    event_to_check = next((e for e in events if e['id'] == event_id), None)
    if not event_to_check:
        return jsonify({'error': 'Event not found'}), 404

    clashes = []
    for event in events:
        if event['id'] == event_id:
            continue

        same_venue = event['venue'] == event_to_check['venue']
        same_time = (
            event['date'] == event_to_check['date'] and
            event['start_time'] < event_to_check['end_time'] and
            event_to_check['start_time'] < event['end_time']
        )

        if same_venue and same_time:
            clashes.append(event)

    return jsonify({'clash': len(clashes) > 0, 'conflicts': clashes})


if __name__ == '__main__':
    app.run(debug=True)
