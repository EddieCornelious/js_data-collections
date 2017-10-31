var BSTNode = require('./BSTNode.js');
var BSTPrototype = require('./BSTPrototype.js');
var RBTreePrototype = require('./RBTreePrototype.js');


class RBNode extends BSTNode {
  constructor(key, value) {
    super(key, value);
    this.color = 'black';
  }
}

class RBTree {
  constructor() {
    this.root = new RBNode();
  }

  insert(key, value) {
    const insertedNode = BSTPrototype.BSTInsert.apply(this, [key, value, RBNode]);
    insertedNode.color = 'red';
    RBTreePrototype.insertFix.apply(this, [insertedNode]);
  }

  remove(key) {
    const removeNode = BSTPrototype.BSTRemove.apply(this, [key]);
    if (removeNode && removeNode.y.color === 'black') {
      RBTreePrototype.deletefixUp.apply(this, [removeNode.x]);
    }
  }
}

module.exports = RBTree;
