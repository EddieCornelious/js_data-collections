import BSTNode from './BSTNode.js';

import {
  BSTInsert,
  BSTRemove,
  BSTSearch,
  BSTInorder,
  less,
  greater
} from './BSTPrototype.js';

import { defaultComp } from './Util.js';

/**
 * Binary search tree representation
 * @class
 * @param {function} comparator - @see Global#defaultComp for examples
 * @example
 * const bst = new Collections.BST();
 * // FOR ALL EXAMPLES BELOW. ASSUME bst IS CLEARED BEFORE EACH EXAMPLE
 */
class BST {
  constructor(comparator) {
    this.root = new BSTNode();
    this.comp = comparator || defaultComp;
    this.inserts = 0;
  }

  /**
  * Inserts the given key and value into BST
  * @param {*} key - The key to insert into BST
  * @param {*} value - The value that is mapped to by @param key
  * @returns {BST} The instance that this method was called with
  *
  * @example
  * bst.insert("ed", "jones").insert("george", "james").insert("ed", "kane");
  * // ed now maps to kane because ed already existed before.
  */
  insert(key, value) {
    const inserted = BSTInsert.call(this, key, value, BSTNode);
    if (inserted) {
      this.inserts += 1;
    }
    return this;
  }

  /**
   * Removes the given key and its associated value from BST
   * @param {*} key - The key to search for
   * @returns {BST} The instance that this method was called with
   *
   * @example
   * bst.insert(1, 5).insert(5, 10);
   * bst.remove(1); // 1 and it's associated value are removed from tree
   * bst.remove("dog"); // this call fails silently as dog never existed in tree
   */
  remove(key) {
    const removed = BSTRemove.call(this, key);
    if (removed) {
      this.inserts -= 1;
    }
    return this;
  }

  /**
  * Finds the value associated with the given key
  * @param {*} key - The key to search for in BST
  * @returns {(*|undefined)} The value associated with @param key or undefined
  * if not found.
  *
  * @example
  * bst.insert(1, 5).insert(5, 10);
  * bst.find(5); // returns 10
  * bst.find(67); // returns undefined
  */
  find(key = null) {
    const node = BSTSearch.call(this, this.root, key);
    return node ? node.value : undefined;
  }

  /**
  * Determines if the BST contains the given key
  * @param {*} key - The key to search for
  * @returns {boolean} True if BST contains @param key and false otherwise
  *
  * @example
  * bst.insert(1, 5).insert(5, 10);
  * bst.contains(5); // returns true
  * bst.contains(67); // returns false
  */
  contains(key) {
    return this.find(key) !== undefined;
  }

  /**
  * Gives the inorder traversal of the BST
  * @returns {Array} Array of objects representing the tree
  */
  inorder() {
    return BSTInorder(this.root);
  }

  /**
   * Returns the smallest value in the tree
   * @returns {*} The smallest value in the tree
   */
  min() {
    let root = this.root;
    if (!root.left) {
      return;
    }
    while (root.left.key !== undefined) {
      root = root.left;
    }
    return root ? root.key : undefined;
  }

  /**
   * Returns the greatest value in the tree
   * @returns {*} The greatest value in the tree
   */
  max() {
    let root = this.root;
    if (!root.right) {
      return;
    }
    while (root.right.key !== undefined) {
      root = root.right;
    }
    return root.key;
  }

  /**
   * Returns all keys less than the given key in the tree
   * @param {*} key - The key to search for
   * @returns {Array} Array of keys less than @param key
   */
  keysLess(key) {
    return less(this.root, key, this.comp);
  }

  /**
   * Returns all keys greater than the given key in the tree
   * @param {*} key - The key to search for
   * @returns {Array} Array of keys greater than @param key
   */
  keysGreater(key) {
    return greater(this.root, key, this.comp);
  }

  /**
   * Clears the tree of all
   * @returns {undefined}
   */
  clear() {
    this.root = null;
    this.inserts = 0;
  }

  /**
   * Reports the number of elements in the BST
   * @returns {number} Number of elements in the BST
   */
  size() {
    return this.inserts;
  }

  /**
   * Gives the keys in the BST
   * @returns {Array} The key set
   */
  keys() {
    return this.inorder().map(node => node.key);
  }
}

export default BST;
