
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
  let curRoot = root;
  const comp = this.comp;
  while (curRoot.key !== undefined) {
    if (comp(curRoot.key, key) === 0) {
      return curRoot;
    } else if (comp(curRoot.key, key) === -1) {
      curRoot = curRoot.right;
    } else {
      curRoot = curRoot.left;
    }
  }
  return null;
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
 * Searches for a node with given key and removes it from tree
 * @private
 * @param {*} key - Key to search for in tree
 * @param {BSTNode} nodeType - Type of Nodes in the tree
 * @returns {boolean} Returns True if node was deleted and false otherwise
 */
function remove(key) {
  let node = search.call(this, this.root, key);
  if (!node) {
    return false;
  }
  let y;
  let x;
  if (node.left.key === undefined || node.right.key === undefined) {
    y = node;
  } else {
    y = successor(node);
  }
  if (y.left.key !== undefined) {
    x = y.left;
  } else {
    x = y.right;
  }
  x.parent = y.parent;
  if (y.parent.key === undefined) {
    this.root = x;
  } else if (y === y.parent.left) {
    y.parent.left = x;
  } else {
    y.parent.right = x;
  }

  if (y !== node) {
    node.key = y.key;
    node.value = y.value;
  }
  return { x, y };
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
  BSTInorder: inorder,
  BSTSuccessor: successor
};
