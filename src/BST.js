import BSTNode from './BSTNode.js';

import {
  BSTInsert,
  BSTRemove,
  BSTSearch,
  BSTInorder
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
    BSTInsert.call(this, key, value, BSTNode);
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
    BSTRemove.call(this, key);
    return this;
  }

  /**
  * Finds the value associated with given key
  * @param {*} key - The key to search for in BST
  * @returns {(*|undefined)} The value associated with @param key or undefined
  * if not found.
  *
  * @example
  * bst.insert(1, 5).insert(5, 10);
  * bst.find(5); // returns 10
  * bst.find(67); // returns undefined
  */
  find(key) {
    const node = BSTSearch.call(this, this.root, key);
    return node ? node.value : undefined;
  }

  /**
  * Determines if BST contains the given key
  * @param {*} key to search for in BST
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
  * Gives the inorder traversal of a BST
  * @returns {Array} Array of objects representing the tree
  *
  * @example
  * bst.insert(1, 5).insert(5, 10).insert(2, 10);
  * bst.inorder(); // [{key: 1, value:5, parent: undefined},
  * {key: 5, value:10, parent: 1}..... ]
  */
  inorder() {
    return BSTInorder(this.root);
  }
}

module.exports = BST;
