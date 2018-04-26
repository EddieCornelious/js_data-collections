
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
  const context = this;
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
          leftRotate.call(context, currentNode);
        }
        currentNode.parent.color = 'black';
        currentNode.parent.parent.color = 'red';
        rightRotate.call(context, currentNode.parent.parent);
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
          rightRotate.call(context, currentNode);
        }
        currentNode.parent.color = 'black';
        currentNode.parent.parent.color = 'red';
        leftRotate.call(context, currentNode.parent.parent);
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
    let uncle;
    if (currentNode === currentNode.parent.left) {
      uncle = currentNode.parent.right;
      if (uncle.color === 'red') {
        uncle.color = 'black';
        currentNode.parent.color = 'red';
        leftRotate.call(context, currentNode.parent);
        uncle = currentNode.parent.right;
      }
      if (uncle.left.color === 'black' && uncle.right.color === 'black') {
        uncle.color = 'red';
        currentNode = currentNode.parent;
      } else {
        if (uncle.right.color === 'black') {
          uncle.left.color = 'black';
          uncle.color = 'red';
          rightRotate.call(context, uncle);
          uncle = currentNode.parent.right;
        }
        uncle.color = currentNode.parent.color;
        currentNode.parent.color = 'black';
        uncle.right.color = 'black';
        leftRotate.call(context, currentNode.parent);
        currentNode = context.root;
      }
    } else {
      uncle = currentNode.parent.left;
      if (uncle.color === 'red') {
        uncle.color = 'black';
        currentNode.parent.color = 'red';
        rightRotate.call(context, currentNode.parent);
        uncle = currentNode.parent.left;
      }
      if (uncle.right.color === 'black' && uncle.left.color === 'black') {
        uncle.color = 'red';
        currentNode = currentNode.parent;
      } else {
        if (uncle.left.color === 'black') {
          uncle.right.color = 'black';
          uncle.color = 'red';
          leftRotate.call(context, uncle);
          uncle = currentNode.parent.left;
        }
        uncle.color = currentNode.parent.color;
        currentNode.parent.color = 'black';
        uncle.left.color = 'black';
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
    return context;
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
