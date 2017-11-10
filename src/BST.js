var BSTNode = require('./BSTNode.js');
var BSTPrototype = require('./BSTPrototype.js');

function defaulComp(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}

class BST {
  constructor(comparator) {
    this.root = new BSTNode();
    this.comp = comparator || defaulComp;
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
    const node = BSTPrototype.search.call(this, this.root, key);
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
