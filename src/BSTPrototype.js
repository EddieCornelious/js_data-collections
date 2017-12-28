/**
* inserts given key and value into bst (maps key to value)
* @private
* @param {*} key - key to insert in bst
* @param {*} value - value that is mapped to by @param key
* @param {BSTNode} Node - Node type to insert into tree
* @returns null if the node was already in tree, thus not inserted
* or the new node that was just inserted successfully.
*/
function insert(key, value, Node) {
  const comp = this.comp;
  let root = this.root;
  let newNode = new Node(key, value);
  let prevRoot = new Node();
  while (root.key !== undefined) {
    prevRoot = root;
    if (comp(newNode.key, root.key) === -1) {
      root = root.left;
    } else if (comp(newNode.key, root.key) === 1) {
      root = root.right;
    } else {
      root.value = value;
      return null;
    }
  }
  newNode.parent = prevRoot;
  if (prevRoot.key === undefined) {
    this.root = newNode;
  } else if (comp(newNode.key, prevRoot.key) === -1) {
    prevRoot.left = newNode;
  } else {
    prevRoot.right = newNode;
  }
  newNode.left = new Node();
  newNode.right = new Node();
  return newNode;
}
/**
 * searches for the given key in tree
 * @private
 * @param {BSTNode} root - the root node to start search
 * @param {*} key - the key to search for in bst
 * @returns {null|BSTNode} null if not found. Or the actual node if found
 */
function search(root, key) {
  const comp = this.comp;
  if (!root || root.key === undefined) {
    return null;
  }
  if (comp(root.key, key) === 0) {
    return root;
  }
  if (comp(root.key, key) === -1) {
    return search.call(this, root.right, key);
  }
  return search.call(this, root.left, key);
}
/**
 * finds the inorder successor of @param node
 * @private
 * @param {BSTNode} node - node to find the successor for
 * @returns {BSTNode} the inorder successor of @param node
 */
function successor(node) {
  let suc = node.right;
  if (suc.left.key === undefined) {
    return suc;
  }
  while (suc.left.key !== undefined) {
    suc = suc.left;
  }
  return suc;
}
/**
 * gets the number of children of the given node
 * @private
 * @param {BSTNode} node - node to geet number of children of
 * @returns {0|1|2} indicating number of non-Nil children
 */
function numChildren(node) {
  const left = node.left.key;
  const right = node.right.key;
  if (left === undefined && right === undefined) {
    return 0;
  } else if (
    (left === undefined && right !== undefined) ||
    (right === undefined && left !== undefined)) {
    return 1;
  }
  return 2;
}
/**
 * removes given node from tree which has 0 children
 * @private
 * @param {BSTNode} node - node to remove from tree
 * @param {NodeType} NodeType - type of node in BST
 * @returns {undefined}
 */
function remove0(node, NodeType) {
  const comp = this.comp;
  if (comp(this.root.key, node.key) === 0) {
    this.root = new NodeType();
    return;
  }
  const parent = node.parent;
  if (comp(parent.right.key, node.key) === 0) {
    parent.right = node.right;
  } else {
    parent.left = node.left;
  }
}
/**
 * removes given node from tree which has 1 child
 * @private
 * @param {BSTNode} node - node to remove from tree
 * @returns {undefined}
 */
function remove1(node) {
  const comp = this.comp;
  // node is root
  if (comp(node.key, this.root.key) === 0) {
    const root = this.root;
    if (root.left.key !== undefined) {
      this.root = root.left;
      root.left.parent = root.parent;
    } else {
      this.root = root.right;
      root.right.parent = root.parent;
    }
    return;
  }
  // node to delete is left child
  const parent = node.parent;
  if (comp(parent.left.key, node.key) === 0) {
    if (node.right.key !== undefined) {
      parent.left = node.right;
      node.right.parent = parent;
    } else {
      parent.left = node.left;
      node.left.parent = parent;
    }
    return;
  }
  // node to delete is right child
  if (node.right.key !== undefined) {
    parent.right = node.right;
    node.right.parent = parent;
  } else {
    parent.right = node.left;
    node.left.parent = parent;
  }
}
/**
 * removes given node from tree which has 2 children
 * @private
 * @param {BSTNode} node - node to remove from tree
 * @returns {undefined}
 */
function remove2(node) {
  const nodeSucc = successor(node);
  const oldKey = node.key;
  node.key = nodeSucc.key;
  node.value = nodeSucc.value;
  nodeSucc.key = oldKey;
  // successor can only have one child at most and that node
  // must be right child. Or else, node has left child which is a
  // contradiction as that node would be the minimum.
  const succChildren = numChildren(nodeSucc);
  if (succChildren === 0) {
    return remove0.call(this, nodeSucc);
  }
  return remove1.call(this, nodeSucc);
}
/**
 * Searches for a node with given key and removes it from tree
 * @private
 * @param {*} key - key to search for in tree
 * @param {BSTNode} nodeType - type of Nodes in the tree
 * @returns {true|false} true if node was deleted and false otherwise
 */
function remove(key, nodeType) {
  let node = search.call(this, this.root, key);
  if (!node) {
    return false;
  }
  const children = numChildren(node);
  if (children === 0) {
    return remove0.call(this, node, nodeType);
  } else if (children === 1) {
    return remove1.call(this, node);
  }
  return remove2.call(this, node, nodeType);
}
/**
 * gets the inorder traversal starting at given root
 * @private
 * @param {BSTNode} root - root of tree
 * @returns {Array(Object)} Array containing key and value info as well as
 * parent info for each node
 */
function inorder(root) {
  if (root && root.key !== undefined) {
    let tmp = [];
    return tmp.concat(inorder(root.left), root, inorder(root.right));
  }
  return [];
}
/**
 * @private
 */
module.exports = {
  insert,
  remove,
  search,
  inorder
};
