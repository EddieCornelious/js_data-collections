
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
 * Fixes up the rb tree after insertion
 * @private
 * @param {BSTNode} node - The node to begin fixing
 * @returns {undefined}
 */
function insertFix(nodeToFix) {
  let currentNode = nodeToFix;
  let uncle;
  while (currentNode.parent.color === 'red') {
    if (currentNode.parent === currentNode.parent.parent.left) {
      uncle = currentNode.parent.parent.right;
      if (uncle.color === 'red') {
        currentNode.parent.color = 'black';
        uncle.color = 'black';
        currentNode.parent.parent.color = 'red';
        currentNode = currentNode.parent.parent;
      } else {
        if (currentNode === currentNode.parent.right) {
          currentNode = currentNode.parent;
          leftRotate.call(this, currentNode);
        }
        currentNode.parent.color = 'black';
        currentNode.parent.parent.color = 'red';
        rightRotate.call(this, currentNode.parent.parent);
      }
    } else {
      uncle = currentNode.parent.parent.left;
      if (uncle.color === 'red') {
        currentNode.parent.color = 'black';
        uncle.color = 'black';
        currentNode.parent.parent.color = 'red';
        currentNode = currentNode.parent.parent;
      } else {
        if (currentNode === currentNode.parent.left) {
          currentNode = currentNode.parent;
          rightRotate.call(this, currentNode);
        }
        currentNode.parent.color = 'black';
        currentNode.parent.parent.color = 'red';
        leftRotate.call(this, currentNode.parent.parent);
      }
    }
  }
  this.root.color = 'black';
}

/**
 * Fixes up the rb tree after deletion
 * @private
 * @param {BSTNode} node - The node to begin fixing
 * @returns {undefined}
 */
function deletefixUp(nodeToFix) {
  let currentNode = nodeToFix;
  while (currentNode.parent.key !== undefined && currentNode.color === 'black') {
    let uncle;
    if (currentNode === currentNode.parent.left) {
      uncle = currentNode.parent.right;
      if (uncle.color === 'red') {
        uncle.color = 'black';
        currentNode.parent.color = 'red';
        leftRotate.call(this, currentNode.parent);
        uncle = currentNode.parent.right;
      }
      if (uncle.left.color === 'black' && uncle.right.color === 'black') {
        uncle.color = 'red';
        currentNode = currentNode.parent;
      } else {
        if (uncle.right.color === 'black') {
          uncle.left.color = 'black';
          uncle.color = 'red';
          rightRotate.call(this, uncle);
          uncle = currentNode.parent.right;
        }
        uncle.color = currentNode.parent.color;
        currentNode.parent.color = 'black';
        uncle.right.color = 'black';
        leftRotate.call(this, currentNode.parent);
        currentNode = this.root;
      }
    } else {
      uncle = currentNode.parent.left;
      if (uncle.color === 'red') {
        uncle.color = 'black';
        currentNode.parent.color = 'red';
        rightRotate.call(this, currentNode.parent);
        uncle = currentNode.parent.left;
      }
      if (uncle.right.color === 'black' && uncle.left.color === 'black') {
        uncle.color = 'red';
        currentNode = currentNode.parent;
      } else {
        if (uncle.left.color === 'black') {
          uncle.right.color = 'black';
          uncle.color = 'red';
          leftRotate.call(this, uncle);
          uncle = currentNode.parent.left;
        }
        uncle.color = currentNode.parent.color;
        currentNode.parent.color = 'black';
        uncle.left.color = 'black';
        rightRotate.call(this, currentNode.parent);
        currentNode = this.root;
      }
    }
  }
  currentNode.color = 'black';
}

/**
 * Red-Black Tree representation
 * @class
 * @extends BST
 * @param {function} comparator - @see Global#defaultComp for examples
 * @example
 * const bst = new Collections.RBTree();
 * // FOR ALL EXAMPLES BELOW. ASSUME rb IS CLEARED BEFORE EACH EXAMPLE
 */
class RBTree extends BST {
  constructor(comparator) {
    super(comparator);
    this.root = new RBNode();
  }

  insert(key, value) {
    const insertedNode = BSTInsert.call(this, key, value, RBNode);
    if (insertedNode) {
      insertedNode.color = 'red';
      insertFix.call(this, insertedNode);
    }
    return this;
  }

  remove(key) {
    // successor and child
    const { succChild, succ } = BSTRemove.call(this, key);
    if (succ.color === 'black') {
      deletefixUp.call(this, succChild);
    }
    return this;
  }
}

module.exports = RBTree;
