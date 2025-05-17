import bisect

class BPlusTreeNode:
    def __init__(self, is_leaf=False):
        self.is_leaf = is_leaf
        self.keys = []
        self.children = []
        self.next = None  # Only used in leaf nodes for range queries

class BPlusTree:
    def __init__(self, order=3):
        self.root = BPlusTreeNode(True)
        self.order = order
    
    def search(self, key, node=None):
        if node is None:
            node = self.root
        
        if node.is_leaf:
            return key in node.keys
        
        idx = bisect.bisect_left(node.keys, key)
        return self.search(key, node.children[idx])
    
    def insert(self, key):
        root = self.root
        new_child, new_key = self._insert_recursive(root, key)
        
        if new_child:
            new_root = BPlusTreeNode(False)
            new_root.keys.append(new_key)
            new_root.children.append(root)
            new_root.children.append(new_child)
            self.root = new_root
    
    def _insert_recursive(self, node, key):
        if node.is_leaf:
            bisect.insort(node.keys, key)
            
            if len(node.keys) >= self.order:
                return self._split_leaf(node)
            return None, None
        
        idx = bisect.bisect_right(node.keys, key)
        new_child, new_key = self._insert_recursive(node.children[idx], key)
        
        if new_child:
            node.keys.insert(idx, new_key)
            node.children.insert(idx + 1, new_child)
            
            if len(node.keys) >= self.order:
                return self._split_internal(node)
        
        return None, None
    
    def _split_leaf(self, node):
        mid = len(node.keys) // 2
        new_leaf = BPlusTreeNode(True)
        
        new_leaf.keys = node.keys[mid:]
        node.keys = node.keys[:mid]
        
        new_leaf.next = node.next
        node.next = new_leaf
        
        return new_leaf, new_leaf.keys[0]
    
    def _split_internal(self, node):
        mid = len(node.keys) // 2
        new_internal = BPlusTreeNode(False)
        
        new_internal.keys = node.keys[mid + 1:]
        new_internal.children = node.children[mid + 1:]
        
        mid_key = node.keys[mid]
        
        node.keys = node.keys[:mid]
        node.children = node.children[:mid + 1]
        
        return new_internal, mid_key
    
    def inorder_traversal(self, node=None):
        if node is None:
            node = self.root
        
        if node.is_leaf:
            return node.keys
        
        result = []
        for i in range(len(node.keys)):
            result.extend(self.inorder_traversal(node.children[i]))
            result.append(node.keys[i])
        result.extend(self.inorder_traversal(node.children[-1]))
        return result
    
    def level_order_traversal(self):
        from collections import deque
        queue = deque([self.root])
        result = []
        
        while queue:
            node = queue.popleft()
            result.append(node.keys)
            if not node.is_leaf:
                queue.extend(node.children)
        
        return result
    
    def delete(self, key):
        self._delete_recursive(self.root, key)
        
        if not self.root.keys and not self.root.is_leaf:
            self.root = self.root.children[0]
    
    def _delete_recursive(self, node, key):
        if node.is_leaf:
            if key in node.keys:
                node.keys.remove(key)
            return
        
        idx = bisect.bisect_left(node.keys, key)
        if idx < len(node.keys) and node.keys[idx] == key:
            node.keys[idx] = self._get_successor(node.children[idx + 1])
            self._delete_recursive(node.children[idx + 1], node.keys[idx])
        else:
            self._delete_recursive(node.children[idx], key)
        
        if len(node.children[idx].keys) < (self.order - 1) // 2:
            self._rebalance(node, idx)
    
    def _get_successor(self, node):
        while not node.is_leaf:
            node = node.children[0]
        return node.keys[0]
    
    def _rebalance(self, parent, idx):
        child = parent.children[idx]
        
        if idx > 0 and len(parent.children[idx - 1].keys) > (self.order - 1) // 2:
            left_sibling = parent.children[idx - 1]
            child.keys.insert(0, parent.keys[idx - 1])
            parent.keys[idx - 1] = left_sibling.keys.pop()
        elif idx < len(parent.children) - 1 and len(parent.children[idx + 1].keys) > (self.order - 1) // 2:
            right_sibling = parent.children[idx + 1]
            child.keys.append(parent.keys[idx])
            parent.keys[idx] = right_sibling.keys.pop(0)
        else:
            if idx > 0:
                sibling = parent.children[idx - 1]
                sibling.keys.extend(child.keys)
                parent.keys.pop(idx - 1)
                parent.children.pop(idx)
            else:
                sibling = parent.children[idx + 1]
                child.keys.extend(sibling.keys)
                parent.keys.pop(idx)
                parent.children.pop(idx + 1)
    
    def range_query(self, start, end):
        node = self.root
        while not node.is_leaf:
            node = node.children[0]
        
        result = []
        while node:
            result.extend([k for k in node.keys if start <= k <= end])
            node = node.next
        return result

from collections import deque
import heapq

class Graph:
    def __init__(self):
        self.adj_list = {}
    
    def add_edge(self, u, v, weight=1, bidirectional=True):
        if u not in self.adj_list:
            self.adj_list[u] = []
        if v not in self.adj_list:
            self.adj_list[v] = []
        
        self.adj_list[u].append((v, weight))
        if bidirectional:
            self.adj_list[v].append((u, weight))
    
    def bfs(self, start):
        visited = set()
        queue = deque([start])
        traversal = []
        
        while queue:
            node = queue.popleft()
            if node not in visited:
                visited.add(node)
                traversal.append(node)
                for neighbor, _ in self.adj_list.get(node, []):
                    if neighbor not in visited:
                        queue.append(neighbor)
        
        return traversal
    
    def dfs(self, start):
        visited = set()
        traversal = []
        
        def dfs_helper(node):
            if node not in visited:
                visited.add(node)
                traversal.append(node)
                for neighbor, _ in self.adj_list.get(node, []):
                    dfs_helper(neighbor)
        
        dfs_helper(start)
        return traversal
    
    
def dijkstra(self, start):
    min_heap = [(0, start)]
    distances = {node: float('inf') for node in self.adj_list}
    distances[start] = 0
    
    while min_heap:
        current_distance, current_node = heapq.heappop(min_heap)
        
        if current_distance > distances[current_node]:
            continue
        
        for neighbor, weight in self.adj_list[current_node]:
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(min_heap, (distance, neighbor))
    
    return distances

