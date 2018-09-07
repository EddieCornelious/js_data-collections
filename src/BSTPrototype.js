/**
 * Adjusts references for parent and child post insert
 * @private
 */
function adjustParentAndChildrenOfNewNode(
  newNode,
  oldRoot,
  comparator,
  NodeType
) {
  newNode.parent = oldRoot;
  if (oldRoot.key === undefined) {
    this.root = newNode;
  } else if (comparator(newNode.key, oldRoot.key) === -1) {
    oldRoot.left = newNode;
  } else {
    oldRoot.right = newNode;
  }
  newNode.left = new NodeType();
  newNode.right = new NodeType();
}
/**
 * Inserts the given key and value into bst (maps key to value)
 * @private
 * @param {*} key - The key to insert into the bst
 * @param {*} value - The value that is mapped to by @param key
 * @param {BSTNode} Node - The Node type to insert into the tree
 * @returns {(BSTNode|undefined)} undefined if the node was already in tree,
 * thus not inserted or the new node that was just inserted successfully.
 */
export function BSTInsert(key, value, NodeType) {
  const comparator = this.comparator;
  let root = this.root;
  const newNode = new NodeType(key, value);
  let oldRoot = new NodeType();
  while (root.key !== undefined) {
    let comparatorResult = comparator(newNode.key, root.key);
    oldRoot = root;
    if (comparatorResult === -1) {
      root = root.left;
    } else if (comparatorResult === 1) {
      root = root.right;
    } else {
      root.value = value;
      return;
    }
  }
  adjustParentAndChildrenOfNewNode.call(
    this,
    newNode,
    oldRoot,
    comparator,
    NodeType
  );
  return newNode;
}

/**
 * Searches for the given key in tree
 * @private
 * @param {BSTNode} root - The root node to start search
 * @param {*} key - The key to search for in bst
 * @returns {(undefined|BSTNode)} undefined if not found. Or the actual node if found
 */
export function BSTSearch(root, key) {
  let currentRoot = root;
  const comparator = this.comparator;
  while (currentRoot.key !== undefined) {
    let comparatorResult = comparator(currentRoot.key, key);
    if (comparatorResult === 0) {
      return currentRoot;
    } else if (comparatorResult === -1) {
      currentRoot = currentRoot.right;
    } else {
      currentRoot = currentRoot.left;
    }
  }
}

/**
 * Finds the inorder successor of the given node that has 2 children
 * @private
 * @param {BSTNode} node - The Node to find the successor for
 * @returns {BSTNode} The inorder successor of @param node
 */
function successor(node) {
  let nodeSuccessor = node.right;
  while (nodeSuccessor.hasLeftChild()) {
    nodeSuccessor = nodeSuccessor.left;
  }
  return nodeSuccessor;
}

/**
 * @private
 */
function swapPropsWithSucccessor(nodeSuccessor, node) {
  if (nodeSuccessor !== node) {
    node.key = nodeSuccessor.key;
    node.value = nodeSuccessor.value;
  }
}
/**
 * Searches for a node with given key and removes it from tree
 * @private
 * @param {*} key - The key to search for in the tree
 * @returns {boolean|BSTNode} Returns false if node doesn't exist with @param key
 * or the successor and successor child of the node to remove
 */
export function BSTRemove(key) {
  let node = BSTSearch.call(this, this.root, key);
  if (!node) {
    return false;
  }
  let nodeSuccessor;
  let successorChild;
  if (!node.hasLeftChild() || !node.hasRightChild()) {
    nodeSuccessor = node;
  } else {
    nodeSuccessor = successor(node);
  }
  if (nodeSuccessor.hasLeftChild()) {
    successorChild = nodeSuccessor.left;
  } else {
    successorChild = nodeSuccessor.right;
  }
  successorChild.parent = nodeSuccessor.parent;
  if (nodeSuccessor.parent.key === undefined) {
    this.root = successorChild;
  } else if (nodeSuccessor.isLeftChild()) {
    nodeSuccessor.parent.left = successorChild;
  } else {
    nodeSuccessor.parent.right = successorChild;
  }
  swapPropsWithSucccessor(nodeSuccessor, node);
  return {successorChild, nodeSuccessor};
}

/**
 * Gets the inorder traversal starting at given root
 * @private
 * @param {BSTNode} root - The root of tree
 * @param {string} propWanted - The property of each node wanted
 * @param {Array} array - The Array to be updated with the result
 * @returns {undefined}
 */
export function BSTInorder(root, array) {
  if (root && root.key !== undefined) {
    BSTInorder(root.left, array);
    array.push(root);
    BSTInorder(root.right, array);
  }
}

export function getKeysOrValues(root, prop, array) {
  if (root && root.key !== undefined) {
    getKeysOrValues(root.left, prop, array);
    array.push(root[prop]);
    getKeysOrValues(root.right, prop, array);
  }
}

/**
 * Returns all keys less than the given value
 * @private
 * @param {BSTNode} root - The root of the tree
 * @param {*} key - The upper bound value
 * @param {function} comparator - The function used to compare keys to @param value
 * @param {Array} array - The array that holds the result
 * @returns {undefined}
 */
export function less(root, value, comparator, array) {
  if (!root || root.key === undefined) {
    return;
  }
  const rootKey = root.key;
  const comparatorResult = comparator(rootKey, value);
  if (comparatorResult === -1) {
    array.push(rootKey);
    less(root.left, value, comparator, array);
    return less(root.right, value, comparator, array);
  }
  return less(root.left, value, comparator, array);
}

/**
 * Returns all keys greater than the given value
 * @private
 * @param {BSTNode} root - The root of the tree
 * @param {*} key - The lower bound value
 * @param {function} comparator - The function used to compare keys to @param value
 * @param {Array} array - The array that holds the result
 * @returns {undefined}
 */
export function greater(root, value, comparator, array) {
  if (!root || root.key === undefined) {
    return;
  }
  const rootKey = root.key;
  const comparatorResult = comparator(rootKey, value);
  if (comparatorResult === 1) {
    array.push(rootKey);
    greater(root.left, value, comparator, array);
    return greater(root.right, value, comparator, array);
  }
  return greater(root.right, value, comparator, array);
}

/**
 * Returns the max or min based on the given query
 * @private
 * @param {string} query - The value wanted either min or max
 * @param {BSTNode} root - The root of the tree
 * @returns {*|undefined} The min or max value in the tree or undefined for empty tree
 */
export function minOrMax(query, root) {
  let currentRoot = root;
  const direction = query === 'min' ? 'left' : 'right';
  if (currentRoot.key === undefined) {
    return;
  }
  while (currentRoot[direction].key !== undefined) {
    currentRoot = currentRoot[direction];
  }
  return currentRoot.key;
}

/**
 * Returns all keys in the given range
 * @private
 * @param {BSTNode} root - The root of the tree
 * @param {*} lower - The lower bound
 * @param {*} upper - The upper bound
 * @param {function} comparator - The compare function
 * @param {Array} array - The result array
 * @returns {undefined}
 */
export function keysBetween(root, lower, upper, comparator, array) {
  if (!root || root.key === undefined) {
    return;
  }
  const rootKey = root.key;
  const lowerRootComp = comparator(lower, rootKey);
  if (lowerRootComp >= 0) {
    if (lowerRootComp === 0) {
      array.push(rootKey);
    }
    return keysBetween(root.right, lower, upper, comparator, array);
  }
  if (comparator(rootKey, upper) <= 0) {
    array.push(rootKey);
  }
  keysBetween(root.left, lower, upper, comparator, array);
  return keysBetween(root.right, lower, upper, comparator, array);
}
