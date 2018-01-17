
/**
* Inserts given key and value into bst (maps key to value)
* @private
* @param {*} key - The key to insert in bst
* @param {*} value - the value that is mapped to by @param key
* @param {BSTNode} Node - The Node type to insert into tree
* @returns {(BSTNode|null)} Null if the node was already in tree, thus not inserted
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
 * Searches for the given key in tree
 * @private
 * @param {BSTNode} root - The root node to start search
 * @param {*} key - The key to search for in bst
 * @returns {(null|BSTNode)} Null if not found. Or the actual node if found
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
 * Finds the inorder successor of the given node
 * @private
 * @param {BSTNode} node - The Node to find the successor for
 * @returns {BSTNode} The inorder successor of @param node
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
 * Gets the number of children of a given node
 * @private
 * @param {BSTNode} node - The Node to get number of children of
 * @returns {number} The number of non-Nil children 0 || 1 || 2
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
 * Removes given node from tree which has 0 children
 * @private
 * @param {BSTNode} node - The Node to remove from tree
 * @param {NodeType} NodeType - The type of node in BST
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
 * Removes given node from tree which has 1 child
 * @private
 * @param {BSTNode} node - The Node to remove from tree
 * @returns {undefined}
 */
function remove1(node) {
  const comp = this.comp;
  // node is root
  const root = this.root;
  if (comp(node.key, root.key) === 0) {
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
 * Removes given node from tree which has 2 children
 * @private
 * @param {BSTNode} node - The Node to remove from tree
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
 * @param {*} key - Key to search for in tree
 * @param {BSTNode} nodeType - Type of Nodes in the tree
 * @returns {boolean} Returns True if node was deleted and false otherwise
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
 * Gets the inorder traversal starting at given root
 * @private
 * @param {BSTNode} root - The root of tree
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

module.exports = {
  BSTInsert: insert,
  BSTRemove: remove,
  BSTSearch: search,
  BSTInorder: inorder
};
