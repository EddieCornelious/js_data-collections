var BSTNode = require('./BSTNode.js');
var BSTPrototype = require('./BSTPrototype.js');

class BST {
  constructor() {
    this.root = new BSTNode();
  }

  insert(key, value) {
    BSTPrototype.BSTInsert.apply(this, [key, value, BSTNode]);
  }

  remove(key) {
    BSTPrototype.BSTRemove.apply(this, [key]);
  }
}

module.exports = BST;
