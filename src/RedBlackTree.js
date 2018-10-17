import BSTNode from './BSTNode.js';
import {BSTInsert, BSTRemove} from './BSTPrototype.js';
import BST from './BST.js';
const BLACK = 'black';
const RED = 'red';

class RBNode extends BSTNode {
  constructor(key, value) {
    super(key, value);
    this.color = BLACK;
  }

  isRed() {
    return this.color === RED;
  }

  isBlack() {
    return this.color === BLACK;
  }

  colorRed() {
    this.color = RED;
  }

  colorBlack() {
    this.color = BLACK;
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
  if (nodeParent.isNil()) {
    this.root = oldRight;
  } else if (node.isLeftChild()) {
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
  if (nodeParent.isNil()) {
    this.root = oldLeft;
  } else if (node.isLeftChild()) {
    nodeParent.left = oldLeft;
  } else {
    nodeParent.right = oldLeft;
  }
  oldLeft.right = node;
  node.parent = oldLeft;
}

/**
 * Performs the re coloring stage upon insert, based on uncle color
 * @private
 * @param {RBNode} uncle - The uncle of the current node
 * @param {RBNode} currentNode - The current node being fixed in the tree
 * @returns {undefined}
 */
function insertFixRecolor(uncle, currentNode) {
  currentNode.parent.colorBlack();
  uncle.colorBlack();
  currentNode.parent.parent.colorRed();
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
  if (currentNode.isRightChild()) {
    currentNode = currentNode.parent;
    leftRotate.call(context, currentNode);
  }
  currentNode.parent.colorBlack();
  currentNode.parent.parent.colorRed();
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
  if (currentNode.isLeftChild()) {
    currentNode = currentNode.parent;
    rightRotate.call(context, currentNode);
  }
  currentNode.parent.colorBlack();
  currentNode.parent.parent.colorRed();
  leftRotate.call(context, currentNode.parent.parent);
}

/**
 * Performs the recoloring stage when the node's sibling is red
 * @private
 */
function deleteRedSiblingCaseRecolor(currentNode, sibling) {
  sibling.colorBlack();
  currentNode.parent.colorRed();
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
  while (currentNode.parent.isRed()) {
    if (currentNode.parent.isLeftChild()) {
      uncle = currentNode.parent.parent.right;
      if (uncle.isRed()) {
        insertFixRecolor(uncle, currentNode);
        currentNode = currentNode.parent.parent;
      } else {
        insertFixRotate1(currentNode, context);
      }
    } else {
      uncle = currentNode.parent.parent.left;
      if (uncle.isRed()) {
        insertFixRecolor(uncle, currentNode);
        currentNode = currentNode.parent.parent;
      } else {
        insertFixRotate2(currentNode, context);
      }
    }
  }
  context.root.colorBlack();
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
  while (!currentNode.parent.isNil() && currentNode.isBlack()) {
    let sibling;
    if (currentNode.isLeftChild()) {
      sibling = currentNode.parent.right;
      if (sibling.isRed()) {
        deleteRedSiblingCaseRecolor(currentNode, sibling);
        leftRotate.call(context, currentNode.parent);
        sibling = currentNode.parent.right;
      }
      if (sibling.left.isBlack() && sibling.right.isBlack()) {
        sibling.colorRed();
        currentNode = currentNode.parent;
      } else {
        if (sibling.right.isBlack()) {
          sibling.left.colorBlack();
          sibling.colorRed();
          rightRotate.call(context, sibling);
          sibling = currentNode.parent.right;
        }
        sibling.color = currentNode.parent.color;
        currentNode.parent.colorBlack();
        sibling.right.colorBlack();
        leftRotate.call(context, currentNode.parent);
        currentNode = context.root;
      }
    } else {
      sibling = currentNode.parent.left;
      if (sibling.isRed()) {
        deleteRedSiblingCaseRecolor(currentNode, sibling);
        rightRotate.call(context, currentNode.parent);
        sibling = currentNode.parent.left;
      }
      if (sibling.right.isBlack() && sibling.left.isBlack()) {
        sibling.colorRed();
        currentNode = currentNode.parent;
      } else {
        if (sibling.left.isBlack()) {
          sibling.right.colorBlack();
          sibling.colorRed();
          leftRotate.call(context, sibling);
          sibling = currentNode.parent.left;
        }
        sibling.color = currentNode.parent.color;
        currentNode.parent.colorBlack();
        sibling.left.colorBlack();
        rightRotate.call(context, currentNode.parent);
        currentNode = context.root;
      }
    }
  }
  currentNode.colorBlack();
}

/**
 * Red-Black Tree representation
 * @class
 * @extends {BST}
 * @param {function} comparator - @see Global#defaultComp for examples
 * @example
 * const bst = new Collections.RBTree();
 */
class RBTree extends BST {
  constructor(comparator) {
    super(comparator);
    this.root = new RBNode();
  }

  put(key, value) {
    const self = this;
    const insertedNode = BSTInsert.call(self, key, value, RBNode);
    if (insertedNode) {
      insertedNode.colorRed();
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
      const {successorChild, nodeSuccessor} = didRemove;
      if (nodeSuccessor.isBlack()) {
        deletefixUp.call(self, successorChild);
      }
      self.inserts -= 1;
      return true;
    }
    return false;
  }
}

export default RBTree;
