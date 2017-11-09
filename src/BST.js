var BSTNode = require('./BSTNode.js');
var BSTPrototype = require('./BSTPrototype.js');

class BST {
  constructor() {
    this.root = new BSTNode();
  }

  insert(key, value) {
    BSTPrototype.BSTInsert.apply(this, [key, value, BSTNode]);
    return this;
  }

  remove(key) {
    BSTPrototype.BSTRemove.apply(this, [key]);
    return this;
  }

  find(key) {
    const node = BSTPrototype.search(this.root, key);
    return node ? node.value : undefined;
  }

  contains(key) {
    return this.find(key).key ? true : false;
  }

  inorder() {
    return BSTPrototype.inorder(this.root);
  }
}

module.exports = BST;
