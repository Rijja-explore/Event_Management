from datetime import datetime

def build_conflict_graph(event_to_approve, approved_events):
    """
    Builds an adjacency list representing a conflict graph where edges connect events with date or venue clashes.
    
    Args:
        event_to_approve (dict): The event being considered for approval.
        approved_events (list): List of already approved events from Firestore.
    
    Returns:
        dict: Adjacency list where keys are event IDs and values are lists of clashing events.
    """
    graph = {event_to_approve["id"]: []}
    
    # Parse eventDate with time component and extract date only
    date_to_approve = datetime.strptime(event_to_approve["eventDate"], "%Y-%m-%dT%H:%M").date()
    venue_to_approve = event_to_approve.get("venue", "").lower()

    for approved_event in approved_events:
        graph[approved_event["id"]] = []
        approved_date = datetime.strptime(approved_event["eventDate"], "%Y-%m-%dT%H:%M").date()
        approved_venue = approved_event.get("venue", "").lower()

        date_clash = date_to_approve == approved_date
        venue_clash = venue_to_approve and approved_venue and venue_to_approve == approved_venue

        if date_clash or venue_clash:
            graph[event_to_approve["id"]].append(approved_event)
            graph[approved_event["id"]].append(event_to_approve)

    return graph

def check_clashes_with_dfs(event_to_approve, approved_events):
    """
    Uses DFS to detect clashes in date or venue between the event to approve and approved events from Firestore.
    
    Args:
        event_to_approve (dict): The event being considered for approval.
        approved_events (list): List of already approved events from Firestore.
    
    Returns:
        list: List of clashing events with details (title, date, venue, clash type).
    """
    graph = build_conflict_graph(event_to_approve, approved_events)
    visited = set()
    clashes = []

    def dfs(event_id):
        if event_id in visited:
            return
        visited.add(event_id)

        current_event = event_to_approve if event_id == event_to_approve["id"] else next(
            e for e in approved_events if e["id"] == event_id
        )

        for neighbor in graph[event_id]:
            if neighbor["id"] not in visited:
                neighbor_date = datetime.strptime(neighbor["eventDate"], "%Y-%m-%dT%H:%M").date()
                date_to_approve = datetime.strptime(event_to_approve["eventDate"], "%Y-%m-%dT%H:%M").date()
                date_clash = date_to_approve == neighbor_date
                venue_clash = (
                    event_to_approve.get("venue", "").lower() == neighbor.get("venue", "").lower()
                    and event_to_approve.get("venue") and neighbor.get("venue")
                )

                clashes.append({
                    "title": neighbor["title"],
                    "date": neighbor_date.strftime("%Y-%m-%d"),
                    "venue": neighbor.get("venue", "N/A"),
                    "dateClash": date_clash,
                    "venueClash": venue_clash
                })
                dfs(neighbor["id"])

    dfs(event_to_approve["id"])
    return clashes