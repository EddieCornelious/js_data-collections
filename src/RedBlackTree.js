
import BSTNode from './BSTNode.js';
import {
  BSTInsert,
  BSTSearch,
  BSTRemove,
  BSTInorder
} from './BSTPrototype.js';
import { defaultComp } from './Util.js';

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
 * @param {function} comparator - @see Global#defaultComp for examples
 * @example
 * const rb = new Collections.RBTree();
 * // FOR ALL EXAMPLES BELOW. ASSUME rb IS CLEARED BEFORE EACH EXAMPLE
 */
class RBTree {
  constructor(comparator) {
    this.root = new RBNode();
    this.comp = comparator || defaultComp;
  }

  /**
  * Inserts the given key and value into RBTree
  * @param {*} key - The key to insert into RBTree
  * @param {*} value - The value that is mapped to by @param key
  * @returns {RBTree} The instance that this method was called with
  *
  * @example
  * rb.insert("ed", "jones").insert("george", "james").insert("ed", "kane");
  * // ed now maps to kane because ed already existed before.
  */
  insert(key, value) {
    const insertedNode = BSTInsert.call(this, key, value, RBNode);
    if (insertedNode) {
      insertedNode.color = 'red';
      insertFix.call(this, insertedNode);
    }
    return this;
  }
  
  /**
  * Finds the value associated with given key
  * @param {*} key - The key to search for in RBTree
  * @returns {(*|undefined)} The value associated with @param key or undefined
  * if not found.
  *
  * @example
  * rb.insert(1, 5).insert(5, 10);
  * rb.find(5); // returns 10
  * rb.find(67); // returns undefined
  */
  find(key) {
    const node = BSTSearch.call(this, this.root, key);
    return node ? node.value : undefined;
  }

  /**
   * Removes the given key and its associated value from RBTree
   * @param {*} key - The key to search for
   * @returns {RBTree} The instance that this method was called with
   *
   * @example
   * rb.insert(1, 5).insert(5, 10);
   * rb.remove(1); // 1 and it's associated value are removed from tree
   * rb.remove("dog"); // this call fails silently as dog never existed in tree
   */
  remove(key) {
    // successor and child
    const { succChild, succ } = BSTRemove.call(this, key);
    if (succ.color === 'black') {
      deletefixUp.call(this, succChild);
    }
    return true;
  }
  
  /**
  * Determines if RBTree contains the given key
  * @param {*} key to search for in RBTree
  * @returns {boolean} true if RBTree contains @param key and false otherwise
  *
  * @example
  * rb.insert(1, 5).insert(5, 10);
  * rb.contains(5); // returns true
  * rb.contains(67); // returns false
  */
  contains(key) {
    return this.find(key) !== undefined;
  }

  /**
  * Gives the inorder traversal of a RBTree
  * @param {*} key to search for in RBTree
  * @returns {*|undefined} value associated with @param key or undefined
  * if not found.
  *
  * @example
  * rb.insert(1, 5).insert(5, 10);
  * rb.inorder(); // [{key: 1, value:5, color: "black", parent: undefined, ...}]
  */
  inorder() {
    return BSTInorder(this.root);
  }
}

module.exports = RBTree;
