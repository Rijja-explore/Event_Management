from flask import Flask, jsonify, request
import json
import os
import logging
import traceback
from datetime import datetime
from flask_cors import CORS
import time

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Memory storage for events (no need for file storage anymore)
EVENTS_DATA = []

# B+ Tree Implementation
class BPlusTreeNode:
    def __init__(self, is_leaf=False):
        self.keys = []              # List of keys (for leaf: (key, [values]))
        self.children = []          # List of children or values
        self.is_leaf = is_leaf      # Is this node a leaf?
        self.next = None            # Next pointer for leaf nodes

class BPlusTree:
    def __init__(self, order=4):
        self.root = BPlusTreeNode(is_leaf=True)
        self.order = order

    def clear(self):
        self.root = BPlusTreeNode(is_leaf=True)

    def find_leaf(self, node, key):
        """Find the leaf node that should contain the key"""
        while not node.is_leaf:
            for i, item in enumerate(node.keys):
                if key < item:
                    node = node.children[i]
                    break
            else:
                node = node.children[-1]
        return node

    def insert(self, key, value):
        """Insert a key-value pair into the tree"""
        root = self.root
        if len(root.keys) == self.order - 1:
            new_root = BPlusTreeNode()
            new_root.children.append(self.root)
            self.split_child(new_root, 0)
            self.root = new_root
        self._insert_non_full(self.root, key, value)

    def _insert_non_full(self, node, key, value):
        """Insert into a node that is not full"""
        if node.is_leaf:
            # For leaf nodes, keys are tuples of (key, [values])
            for i, item in enumerate(node.keys):
                if item[0] == key:
                    # Key already exists, append value to the list
                    item[1].append(value)
                    return
                
            # Key doesn't exist, add new entry
            node.keys.append((key, [value]))
            node.keys.sort(key=lambda x: x[0])
            
            # Split if necessary
            if len(node.keys) == self.order:
                self.split_leaf(node)
        else:
            # Find the appropriate child
            i = 0
            while i < len(node.keys) and key >= node.keys[i]:
                i += 1
                
            child = node.children[i]
            
            # Split child if full
            if len(child.keys) == self.order - 1:
                self.split_child(node, i)
                if key > node.keys[i]:
                    i += 1
                    
            self._insert_non_full(node.children[i], key, value)

    def split_leaf(self, leaf):
        """Split a leaf node"""
        new_leaf = BPlusTreeNode(is_leaf=True)
        mid = len(leaf.keys) // 2
        
        # Move half of the keys to the new leaf
        new_leaf.keys = leaf.keys[mid:]
        leaf.keys = leaf.keys[:mid]
        
        # Update next pointers for linked list
        new_leaf.next = leaf.next
        leaf.next = new_leaf

        # If leaf is root, create new root
        if leaf == self.root:
            new_root = BPlusTreeNode()
            new_root.keys = [new_leaf.keys[0][0]]
            new_root.children = [leaf, new_leaf]
            self.root = new_root
        else:
            self.insert_in_parent(leaf, new_leaf.keys[0][0], new_leaf)

    def split_child(self, parent, index):
        """Split a child node"""
        node = parent.children[index]
        mid = self.order // 2
        
        new_node = BPlusTreeNode(is_leaf=node.is_leaf)
        
        if node.is_leaf:
            # For leaf nodes, insert the first key of new_node
            parent.keys.insert(index, node.keys[mid][0])
            new_node.keys = node.keys[mid:]
            node.keys = node.keys[:mid]
        else:
            # For internal nodes, insert the middle key to parent
            parent.keys.insert(index, node.keys[mid])
            new_node.keys = node.keys[mid+1:]
            node.keys = node.keys[:mid]
            
            # Distribute children
            new_node.children = node.children[mid+1:]
            node.children = node.children[:mid+1]

        parent.children.insert(index + 1, new_node)

    def insert_in_parent(self, old_node, key, new_node):
        """Insert a key and new_node into the parent of old_node"""
        parent = self.find_parent(self.root, old_node)
        
        if parent is None:
            # Create new root
            new_root = BPlusTreeNode()
            new_root.keys = [key]
            new_root.children = [old_node, new_node]
            self.root = new_root
            return
            
        # Insert into parent
        idx = parent.children.index(old_node)
        parent.keys.insert(idx, key)
        parent.children.insert(idx + 1, new_node)
        
        # Split parent if necessary
        if len(parent.keys) == self.order:
            self.split_internal(parent)

    def split_internal(self, node):
        """Split an internal node"""
        if node == self.root:
            return
            
        parent = self.find_parent(self.root, node)
        mid = self.order // 2
        
        # Create new internal node
        new_node = BPlusTreeNode()
        new_node.keys = node.keys[mid+1:]
        new_node.children = node.children[mid+1:]
        
        # Insert middle key to parent
        parent.keys.append(node.keys[mid])
        parent.children.append(new_node)
        
        # Update original node
        node.keys = node.keys[:mid]
        node.children = node.children[:mid+1]

    def find_parent(self, node, child):
        """Find the parent node of a child"""
        if node.is_leaf or not node.children:
            return None
            
        for i in range(len(node.children)):
            if node.children[i] == child:
                return node
                
            res = self.find_parent(node.children[i], child)
            if res:
                return res
                
        return None

    def search(self, key):
        """Search for a key in the tree"""
        node = self.find_leaf(self.root, key)
        for item in node.keys:
            if item[0] == key:
                return item[1]
        return []
        
    def range_search(self, start_key=None, end_key=None):
        """Range search from start_key to end_key (inclusive)"""
        results = []
        
        # Find the leaf node that contains the start key
        if start_key is None:
            # Start from the leftmost leaf
            node = self.root
            while not node.is_leaf:
                node = node.children[0]
        else:
            node = self.find_leaf(self.root, start_key)
        
        # Traverse the leaf nodes collecting results
        while node:
            for key, values in node.keys:
                if (start_key is None or key >= start_key) and (end_key is None or key <= end_key):
                    results.extend(values)
            node = node.next
            
            # Stop if we've gone past the end key
            if node and end_key is not None and node.keys and node.keys[0][0] > end_key:
                break
                
        return results

    def get_all_sorted(self):
        """Get all values in sorted order by key"""
        return self.range_search()

# Initialize B+ Trees
date_tree = BPlusTree()
category_tree = BPlusTree()

def rebuild_trees(events_data):
    """Rebuild the B+ trees with events data"""
    try:
        # Clear existing trees
        date_tree.clear()
        category_tree.clear()
        
        logger.info(f"🌳 Rebuilding B+ trees with {len(events_data)} events")
        
        # Insert events into trees
        for event in events_data:
            # Use event date as key for date_tree
            event_date = event.get("eventDate", "Unknown")
            date_tree.insert(event_date, event)
            
            # Use normalized category as key for category_tree
            category = event.get("category", "Unknown").strip().upper()
            category_tree.insert(category, event)
            
        logger.info("🌳 B+ trees rebuilt successfully")
        return True
    except Exception as e:
        logger.error(f"❌ Error rebuilding B+ trees: {str(e)}")
        logger.error(traceback.format_exc())
        return False

@app.route('/update-events', methods=['POST'])
def update_events():
    """Endpoint to receive updated events data from React"""
    try:
        data = request.json
        events = data.get('events', [])
        
        # Update the global events data
        global EVENTS_DATA
        EVENTS_DATA = events
        
        # Rebuild B+ trees with updated data
        success = rebuild_trees(events)
        
        if success:
            return jsonify({
                "message": f"Events data updated successfully. {len(events)} events processed.",
                "timestamp": datetime.now().isoformat()
            }), 200
        else:
            return jsonify({
                "error": "Failed to update B+ trees with events data",
                "timestamp": datetime.now().isoformat()
            }), 500
    except Exception as e:
        logger.error(f"❌ Error in update-events endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/test', methods=['GET'])
def test_data():
    """Test if events data is accessible"""
    try:
        if EVENTS_DATA and len(EVENTS_DATA) > 0:
            return jsonify({
                "message": "Data access successful", 
                "sample": EVENTS_DATA[0],
                "count": len(EVENTS_DATA)
            }), 200
        else:
            return jsonify({
                "message": "No events found in data"
            }), 200
    except Exception as e:
        logger.error(f"❌ Test endpoint error: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/search/date/<date>', methods=['GET'])
def search_by_date(date):
    """Search for events by exact date using B+ tree"""
    try:
        # Ensure B+ trees are populated
        if not date_tree.root.keys:
            return jsonify({"error": "No events data available"}), 400
            
        results = date_tree.search(date)
        logger.info(f"📍 Found {len(results)} events for date: {date}")
        
        return jsonify({"events": results}), 200
    except Exception as e:
        logger.error(f"❌ Error searching by date: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/search/date-range', methods=['GET'])
def search_by_date_range():
    """Search for events within a date range using B+ tree"""
    try:
        start_date = request.args.get('start', None)
        end_date = request.args.get('end', None)
        
        # Ensure B+ trees are populated
        if not date_tree.root.keys:
            return jsonify({"error": "No events data available"}), 400
            
        results = date_tree.range_search(start_date, end_date)
        logger.info(f"📍 Found {len(results)} events in date range from {start_date} to {end_date}")
        
        return jsonify({"events": results}), 200
    except Exception as e:
        logger.error(f"❌ Error searching by date range: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/search/category/<category>', methods=['GET'])
def search_by_category(category):
    """Search for events by category using B+ tree"""
    try:
        # Ensure B+ trees are populated
        if not category_tree.root.keys:
            return jsonify({"error": "No events data available"}), 400
            
        normalized = category.strip().upper()
        results = category_tree.search(normalized)
        
        logger.info(f"📍 Found {len(results)} events for category: {category}")
        return jsonify({"events": results}), 200
    except Exception as e:
        logger.error(f"❌ Error searching by category: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/search/categories', methods=['GET'])
def get_all_categories():
    """Get all unique categories"""
    try:
        if not EVENTS_DATA:
            return jsonify({"categories": []}), 200
            
        categories = list(set(e.get('category', '').strip().upper() for e in EVENTS_DATA if e.get('category')))
        categories.sort()
        
        return jsonify({"categories": categories}), 200
    except Exception as e:
        logger.error(f"❌ Error fetching categories: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/events/sorted/date', methods=['GET'])
def get_events_sorted_by_date():
    """Get all events sorted by date using B+ tree"""
    try:
        # Ensure B+ trees are populated
        if not date_tree.root.keys:
            return jsonify({"error": "No events data available"}), 400
            
        sorted_events = date_tree.get_all_sorted()
        
        # Apply optional limit
        limit = request.args.get('limit', default=None, type=int)
        if limit:
            sorted_events = sorted_events[:limit]
        
        logger.info(f"📍 Returned {len(sorted_events)} events sorted by date")
        return jsonify({"events": sorted_events}), 200
    except Exception as e:
        logger.error(f"❌ Error fetching events sorted by date: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/events/sorted/category', methods=['GET'])
def get_events_sorted_by_category():
    """Get all events sorted by category using B+ tree"""
    try:
        # Ensure B+ trees are populated
        if not category_tree.root.keys:
            return jsonify({"error": "No events data available"}), 400
            
        sorted_events = category_tree.get_all_sorted()
        
        # Apply optional limit
        limit = request.args.get('limit', default=None, type=int)
        if limit:
            sorted_events = sorted_events[:limit]
        
        logger.info(f"📍 Returned {len(sorted_events)} events sorted by category")
        return jsonify({"events": sorted_events}), 200
    except Exception as e:
        logger.error(f"❌ Error fetching events sorted by category: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    """Simple index route"""
    return jsonify({
        "message": "Event Management API with B+ Tree",
        "endpoints": [
            "/update-events - Update events data from React",
            "/search/date/<date> - Get events by exact date using B+ Tree",
            "/search/date-range?start=<date>&end=<date> - Get events in date range using B+ Tree",
            "/search/category/<category> - Get events by category using B+ Tree",
            "/search/categories - Get all unique categories",
            "/events/sorted/date - Get all events sorted by date using B+ Tree",
            "/events/sorted/category - Get all events sorted by category using B+ Tree",
            "/test - Test data access"
        ]
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=9000)