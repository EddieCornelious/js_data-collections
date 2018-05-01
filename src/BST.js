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
  * Inserts the given key and value into the BST
  * @param {*} [key=null] - The key to insert into the BST
  * @param {*} [value=null] - The value that is mapped to by @param key
  * @returns {BST} The instance that this method was called with
  *
  * @example
  * bst.insert("ed", "jones").insert("george", "james").insert("ed", "kane");
  * // ed now maps to kane because ed already existed before.
  */
  insert(key = null, value = null) {
    const self = this;
    const inserted = BSTInsert.call(self, key, value, BSTNode);
    if (inserted) {
      self.inserts += 1;
    }
    return self;
  }

  /**
   * Removes the given key and its associated value from the BST
   * @param {*} key - The key to search for
   * @returns {boolean} True if the key existed before and false otherwise
   *
   * @example
   * bst.insert(1, 5).insert(5, 10);
   * bst.remove(1); //1 and it's associated value are removed from BST
   * bst.remove("dog");// this call fails silently as dog never existed in BST
   */
  remove(key) {
    const self = this;
    const removed = BSTRemove.call(self, key);
    if (removed) {
      self.inserts -= 1;
      return true;
    }
    return false;
  }

  /**
  * Finds the value associated with the given key
  * @param {*} key - The key to search for in the BST
  * @returns {(*|undefined)} The value associated with @param key or undefined
  * if not found.
  *
  * @example
  * bst.insert(1, 5).insert(5, 10);
  * bst.find(5); // returns 10
  * bst.find(67); // returns undefined
  */
  find(key) {
    const self = this;
    const node = BSTSearch.call(self, self.root, key);
    return node ? node.value : undefined;
  }

  /**
  * Determines if the BST contains the given key
  * @param {*} key - The key to search for
  * @returns {boolean} True if the BST contains @param key and false otherwise
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
  * @returns {Array} Array of objects representing the BST
  */
  inorder() {
    return BSTInorder(this.root);
  }

  /**
   * Returns the smallest value in the BST according to it's ordering function
   * @returns {*} The smallest value in the BST
   */
  min() {
    let root = this.root;
    if (root.key === undefined) {
      return;
    }
    while (root.left.key !== undefined) {
      root = root.left;
    }
    return root.key;
  }

  /**
   * Returns the greatest value in the tree according to it's ordering function
   * @returns {*} The greatest value in the BST
   */
  max() {
    let root = this.root;
    if (root.key === undefined) {
      return;
    }
    while (root.right.key !== undefined) {
      root = root.right;
    }
    return root.key;
  }

  /**
   * Returns all keys less than the given key in the BST
   * @param {*} value - The value used as the upper bound
   * @returns {Array} Array of keys less than @param key
   */
  keysLess(value) {
    const self = this;
    return less(self.root, value, self.comp);
  }

  /**
   * Returns all keys greater than the given key in the BST
   * @param {*} value - The value used as the lower bound
   * @returns {Array} Array of keys greater than @param key
   */
  keysGreater(value) {
    const self = this;
    return greater(self.root, value, self.comp);
  }

  /**
   * Empties the BST
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

  /**
   * Gives the values in the BST
   * @returns {Array} The value set
   */
  values() {
    return this.inorder().map(node => node.value);
  }
}

export default BST;
