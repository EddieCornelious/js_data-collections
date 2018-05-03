
import BSTNode from './BSTNode.js';
import {
  BSTInsert,
  BSTRemove
} from './BSTPrototype.js';
import BST from './BST.js';

class RBNode extends BSTNode {
  constructor(key, value) {
    super(key, value);
    this.color = 'black';
  }
}

/**
 * Left rotates the given node
 * @private
 * @param {BSTNode} node - The node to rotate
 * @returns {undefined}
 */
function leftRotate(node) {
  let oldRight = node.right;
  let nodeParent = node.parent;
  node.right = oldRight.left;
  oldRight.left.parent = node;
  oldRight.parent = nodeParent;
  // root
  if (nodeParent.key === undefined) {
    this.root = oldRight;
  } else if (node === nodeParent.left) {
    nodeParent.left = oldRight;
  } else {
    nodeParent.right = oldRight;
  }
  oldRight.left = node;
  node.parent = oldRight;
}

/**
 * Right rotates the given node
 * @private
 * @param {BSTNode} node - The node to rotate
 * @returns {undefined}
 */
function rightRotate(node) {
  let oldLeft = node.left;
  let nodeParent = node.parent;
  node.left = oldLeft.right;
  oldLeft.right.parent = node;
  oldLeft.parent = nodeParent;
  // root
  if (nodeParent.key === undefined) {
    this.root = oldLeft;
  } else if (node === nodeParent.left) {
    nodeParent.left = oldLeft;
  } else {
    nodeParent.right = oldLeft;
  }
  oldLeft.right = node;
  node.parent = oldLeft;
}

/**
 * @private
 * Performs the re coloring stage upon insert, based on uncle color
 * @param {RBNode} uncle - The uncle of the current node
 * @param {RBNode} currentNode - The current node being fixed in the tree
 * @returns {undefined}
 */
function insertFixRecolor(uncle, currentNode) {
  currentNode.parent.color = 'black';
  uncle.color = 'black';
  currentNode.parent.parent.color = 'red';
}

/**
 * @private
 * Performs the rotation stage on insert, based on uncle color and if current
 * right child
 * @param {RBNode} currentNode - The current node being fixed in the tree
 * @param {RBNode} context - The RBTree instance
 * @returns {undefined}
 */
function insertFixRotate1(node, context) {
  let currentNode = node;
  if (currentNode === currentNode.parent.right) {
    currentNode = currentNode.parent;
    leftRotate.call(context, currentNode);
  }
  currentNode.parent.color = 'black';
  currentNode.parent.parent.color = 'red';
  rightRotate.call(context, currentNode.parent.parent);
}

/**
 * @private
 * Performs the rotation stage on insert, based on uncle color and if current
 * node is left child
 * @param {RBNode} currentNode - The current node being fixed in the tree
 * @param {RBNode} context - The RBTree instance
 * @returns {undefined}
 */
function insertFixRotate2(node, context) {
  let currentNode = node;
  if (currentNode === currentNode.parent.left) {
    currentNode = currentNode.parent;
    rightRotate.call(context, currentNode);
  }
  currentNode.parent.color = 'black';
  currentNode.parent.parent.color = 'red';
  leftRotate.call(context, currentNode.parent.parent);
}

/**
 * Performs the recoloring stage when the node's sibling is red
 */
function deleteRedSiblingCase(currentNode, sibling) {
  sibling.color = 'black';
  currentNode.parent.color = 'red';
}

/**
 * Fixes up the rb tree after insertion
 * @private
 * @param {BSTNode} node - The node to begin fixing
 * @returns {undefined}
 */
function insertFix(nodeToFix) {
  let currentNode = nodeToFix;
  const context = this;
  let uncle;
  while (currentNode.parent.color === 'red') {
    if (currentNode.parent === currentNode.parent.parent.left) {
      uncle = currentNode.parent.parent.right;
      if (uncle.color === 'red') {
        insertFixRecolor(uncle, currentNode);
        currentNode = currentNode.parent.parent;
      } else {
        insertFixRotate1(currentNode, context);
      }
    } else {
      uncle = currentNode.parent.parent.left;
      if (uncle.color === 'red') {
        insertFixRecolor(uncle, currentNode);
        currentNode = currentNode.parent.parent;
      } else {
        insertFixRotate2(currentNode, context);
      }
    }
  }
  context.root.color = 'black';
}

/**
 * Fixes up the rb tree after deletion
 * @private
 * @param {BSTNode} node - The node to begin fixing
 * @returns {undefined}
 */
function deletefixUp(nodeToFix) {
  let currentNode = nodeToFix;
  const context = this;
  while (currentNode.parent.key !== undefined && currentNode.color === 'black') {
    let sibling;
    if (currentNode === currentNode.parent.left) {
      sibling = currentNode.parent.right;
      if (sibling.color === 'red') {
        deleteRedSiblingCase(currentNode, sibling);
        leftRotate.call(context, currentNode.parent);
        sibling = currentNode.parent.right;
      }
      if (sibling.left.color === 'black' && sibling.right.color === 'black') {
        sibling.color = 'red';
        currentNode = currentNode.parent;
      } else {
        if (sibling.right.color === 'black') {
          sibling.left.color = 'black';
          sibling.color = 'red';
          rightRotate.call(context, sibling);
          sibling = currentNode.parent.right;
        }
        sibling.color = currentNode.parent.color;
        currentNode.parent.color = 'black';
        sibling.right.color = 'black';
        leftRotate.call(context, currentNode.parent);
        currentNode = context.root;
      }
    } else {
      sibling = currentNode.parent.left;
      if (sibling.color === 'red') {
        deleteRedSiblingCase(currentNode, sibling);
        rightRotate.call(context, currentNode.parent);
        sibling = currentNode.parent.left;
      }
      if (sibling.right.color === 'black' && sibling.left.color === 'black') {
        sibling.color = 'red';
        currentNode = currentNode.parent;
      } else {
        if (sibling.left.color === 'black') {
          sibling.right.color = 'black';
          sibling.color = 'red';
          leftRotate.call(context, sibling);
          sibling = currentNode.parent.left;
        }
        sibling.color = currentNode.parent.color;
        currentNode.parent.color = 'black';
        sibling.left.color = 'black';
        rightRotate.call(context, currentNode.parent);
        currentNode = context.root;
      }
    }
  }
  currentNode.color = 'black';
}

/**
 * Red-Black Tree representation
 * @private
 * @class
 * @extends BST
 * @param {function} comparator - @see Global#defaultComp for examples
 * @example
 * const bst = new Collections.RBTree();
 */
class RBTree extends BST {
  constructor(comparator) {
    super(comparator);
    this.root = new RBNode();
  }

  insert(key, value) {
    const self = this;
    const insertedNode = BSTInsert.call(self, key, value, RBNode);
    if (insertedNode) {
      insertedNode.color = 'red';
      insertFix.call(self, insertedNode);
      self.inserts += 1;
    }
    return self;
  }

  remove(key) {
    const self = this;
    // successor and child
    const didRemove = BSTRemove.call(self, key);
    if (didRemove) {
      const { succChild, succ } = didRemove;
      if (succ.color === 'black') {
        deletefixUp.call(self, succChild);
      }
      self.inserts -= 1;
      return true;
    }
    return false;
  }
}

export default RBTree;
