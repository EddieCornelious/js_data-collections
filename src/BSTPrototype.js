
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
  const comp = this.comp;
  let root = this.root;
  const newNode = new NodeType(key, value);
  let prevRoot = new NodeType();
  while (root.key !== undefined) {
    let compResult = comp(newNode.key, root.key);
    prevRoot = root;
    if (compResult === -1) {
      root = root.left;
    } else if (compResult === 1) {
      root = root.right;
    } else {
      root.value = value;
      return;
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
  newNode.left = new NodeType();
  newNode.right = new NodeType();
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
  let curRoot = root;
  const comp = this.comp;
  while (curRoot.key !== undefined) {
    let compResult = comp(curRoot.key, key);
    if (compResult === 0) {
      return curRoot;
    } else if (compResult === -1) {
      curRoot = curRoot.right;
    } else {
      curRoot = curRoot.left;
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
  let suc = node.right;
  while (suc.left.key !== undefined) {
    suc = suc.left;
  }
  return suc;
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
  let succ;
  let succChild;
  if (node.left.key === undefined || node.right.key === undefined) {
    succ = node;
  } else {
    succ = successor(node);
  }
  if (succ.left.key !== undefined) {
    succChild = succ.left;
  } else {
    succChild = succ.right;
  }
  succChild.parent = succ.parent;
  if (succ.parent.key === undefined) {
    this.root = succChild;
  } else if (succ === succ.parent.left) {
    succ.parent.left = succChild;
  } else {
    succ.parent.right = succChild;
  }

  if (succ !== node) {
    node.key = succ.key;
    node.value = succ.value;
  }
  return { succChild, succ };
}

/**
 * Gets the inorder traversal starting at given root
 * @private
 * @param {BSTNode} root - The root of tree
 * @returns {Array(Object)} Array containing tree representation
 */
export function BSTInorder(root) {
  if (root && root.key !== undefined) {
    let tmp = [];
    return tmp.concat(BSTInorder(root.left), root, BSTInorder(root.right));
  }
  return [];
}

/**
 * Returns all keys less than the given value
 * @private
 * @param {BSTNode} root - The root of the tree
 * @param {*} key - The upper bound value
 * @param {function} comparator - The function used to compare keys to @param value
 * @returns {Array} Array of keys less than @param value
 */
export function less(root, value, comparator) {
  let temp = [];
  if (!root || root.key === undefined) {
    return temp;
  }
  const rootKey = root.key;
  const comp = comparator(rootKey, value);
  const leftRes = less(root.left, value, comparator);
  if (comp === -1) {
    temp.push(rootKey);
    return temp.concat(leftRes, less(root.right, value, comparator));
  }
  return leftRes;
}

/**
 * Returns all keys greater than the given value
 * @private
 * @param {BSTNode} root - The root of the tree
 * @param {*} key - The lower bound value
 * @param {function} comparator - The function used to compare keys to @param value
 * @returns {Array} Array of keys greater than @param value
 */
export function greater(root, value, comparator) {
  let temp = [];
  if (!root || root.key === undefined) {
    return temp;
  }
  const rootKey = root.key;
  const comp = comparator(rootKey, value);
  const rightRes = greater(root.right, value, comparator);
  if (comp === 1) {
    temp.push(rootKey);
    return temp.concat(greater(root.left, value, comparator), rightRes);
  }
  return rightRes;
}
