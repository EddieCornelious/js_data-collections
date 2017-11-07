var BSTNode = require('./BSTNode.js');
var BSTPrototype = require('./BSTPrototype.js');

function height(z) {
  if (!z) {
    return 0;
  }
  return z.height;
}

function leftRotate(x) {
  let y = x.right;
  x.right = y.left;
  if (y.left.key === undefined) {
    y.left.parent = x;
  }
  y.parent = x.parent;
  if (x.parent.key === undefined) {
    this.root = y;
  } else if (x.key === x.parent.left.key) {
    x.parent.left = y;
  } else {
    x.parent.right = y;
  }
  y.left = x;
  x.parent = y;
  x.height = Math.max(height(x.left), height(x.right)) + 1;
  y.height = Math.max(height(y.left), height(y.right)) + 1;
}

function rightRotate(x) {
  let y = x.left;
  x.left = y.right;
  if (y.right.key === undefined) {
    y.right.parent = x;
  }
  y.parent = x.parent;
  if (x.parent.key === undefined) {
    this.root = y;
  } else if (x.key === x.parent.right.key) {
    x.parent.right = y;
  } else {
    x.parent.left = y;
  }
  y.right = x;
  x.parent = y;
  x.height = Math.max(height(x.left), height(x.right)) + 1;
  y.height = Math.max(height(y.left), height(y.right)) + 1;
}
function getBalance(z) {
  if (!z) {
    return 0;
  }
  return z.left.height - z.right.height;
}
function fixUp(node) {
  node.height = 1 + Math.max(height(node.left), height(node.right));
  const balance = getBalance(node);
  if (balance > 1) {
    if (getBalance(node.left) < 0) {
      leftRotate.call(this, node.left);
    }
    return rightRotate.call(this, node);
  }
  if (balance < -1) {
    if (getBalance(node.right) > 0) {
      rightRotate.call(this, node.right);
    }
    return leftRotate.call(this, node);
  }
  if (node.parent.key !== undefined) {
    fixUp.call(this, node.parent);
  }
}
class AVLNode extends BSTNode {
  constructor(key, value) {
    super(key, value);
    this.height = 0;
  }
}
class AVL {
  constructor() {
    this.root = new AVLNode();
  }
  insert(key, value) {
    const inserted = BSTPrototype.BSTInsert.apply(this, [key, value, AVLNode]);
    if (inserted) {
      fixUp.call(this, inserted);
    }
  }
  remove(key) {
    const removed = BSTPrototype.BSTRemove.apply(this, [key]);
    // y is removed node so we trickle up to it's parent
    if (removed) {
      fixUp.call(this, removed.y);
    }
  }
  find(key){
    return BSTPrototype.search(this.root, key);
  }
}
module.exports = AVL;
