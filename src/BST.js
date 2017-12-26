const BSTNode = require('./BSTNode.js');
const BSTPrototype = require('./BSTPrototype.js');

function defaulComp(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}
/**
 * Binary search tree representation
 * @class
 * @param {function} [comparator] - function used to compare nodes in tree
 * @example
 * const bst = new Structs.BST()
 * default comparator simply compares (a < b) : returns -1
 * (a > b) : returns 1, else : 0
 * 
 */
class BST {
  constructor(comparator) {
    this.root = new BSTNode();
    this.comp = comparator || defaulComp;
  }
  /**
  * inserts the given key and value into BST
  * @example
  * bst.insert("ed", "jones").insert("george", "james").insert("ed", "kane");
  * // ed now maps to kane because it already existed before.
  * @param {*} key - the key to insert into BST
  * @param {*} value - the value that is mapped to by @param key
  * @returns {BST} the instance that this method was called with
  */
  insert(key, value) {
    BSTPrototype.BSTInsert.call(this, key, value, BSTNode);
    return this;
  }
  /**
   * removes a key and it's associated value from BST
   * @example
   * bst.insert(1, 5).insert(5, 10);
   * bst.remove(1);
   * // 1 and it's associated value are removed from tree
   * bst.remove("dog");
   * // this call fails silently as dog never existed in tree
   * @param {*} key - the key to search for
   * @returns {BST} the instance that this method was called with
   */
  remove(key) {
    BSTPrototype.BSTRemove.call(this, key, BSTNode);
    return this;
  }
  /**
   * finds the value associated with given key
   * @example
   * bst.insert(1, 5).insert(5, 10);
   * bst.find(5);
   * // returns 10
   * bst.find(67);
   * // returns undefined
   * @param {*} key to search for in BST
   * @returns {(*|undefined)} value associated with @param key or undefined
   * if not found
   */
  find(key) {
    const node = BSTPrototype.search.call(this, this.root, key);
    return node ? node.value : undefined;
  }
   /**
   * determines if 'this' BST contains the given key
   * @example
   * bst.insert(1, 5).insert(5, 10);
   * bst.contains(5);
   * // returns true
   * bst.find(67);
   * // returns false
   * @param {*} key to search for in BST
   * @returns {boolean} true if BST contains @param key and false otherwise
   */
  contains(key) {
    const node = BSTPrototype.search.call(this, this.root, key);
    return node ? true : false;
  }
   /**
   * gives the inorder traversal of 'this' BST
   * @example
   * bst.insert(1, 5).insert(5, 10).insert(2, 10);
   * bst.inorder();
   * [{key: 1, value:5, parent: undefined}, {key: 5, value:10, parent: 1}..... ]
   * @param {*} key to search for in BST
   * @returns {*|undefined} value associated with @param key or undefined
   * if not found
   */
  inorder() {
    return BSTPrototype.inorder(this.root);
  }
}

module.exports = BST;
