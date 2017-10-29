var BSTNode = require('./BSTNode.js');

function BSTInsert(key, value, Node) {
  let x = this.root;
  let z = new Node(key, value);
  let y = new Node();
  while (x.key !== undefined) {
    y = x;
    if (z.key < x.key) {
      x = x.left;
    } else {
      x = x.right;
    }
  }
  z.parent = y;
  if (y.key === undefined) {
    this.root = z;
  } else if (z.key < y.key) {
    y.left = z;
  } else {
    y.right = z;
  }
  z.left = new Node();
  z.right = new Node();
}

class BST {
  constructor() {
    this.root = new BSTNode();
  }

  insert(key, value) {
    BSTInsert.apply(this, [key, value, BSTNode]);
  }
}

module.exports = BST;
