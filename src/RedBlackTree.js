
import BSTNode from './BSTNode.js';
import {
  BSTInsert,
  BSTSearch,
  BSTRemove
} from './BSTPrototype.js';
import { defaultComp } from './Util.js';

class RBNode extends BSTNode {
  constructor(key, value) {
    super(key, value);
    this.color = 'black';
  }
}

function leftRotate(x) {
  let y = x.right;
  x.right = y.left;
  y.left.parent = x;
  y.parent = x.parent;
  if (x.parent.key === undefined) {
    this.root = y;
  } else if (x === x.parent.left) {
    x.parent.left = y;
  } else {
    x.parent.right = y;
  }
  y.left = x;
  x.parent = y;
}

function rightRotate(x) {
  let y = x.left;
  x.left = y.right;
  y.right.parent = x;
  y.parent = x.parent;
  if (x.parent.key === undefined) {
    this.root = y;
  } else if (x === x.parent.left) {
    x.parent.left = y;
  } else {
    x.parent.right = y;
  }
  y.right = x;
  x.parent = y;
}

function insertFix(node) {
  let z = node;
  let y;
  while (z.parent.color === 'red') {
    if (z.parent === z.parent.parent.left) {
      y = z.parent.parent.right;
      if (y.color === 'red') {
        z.parent.color = 'black';
        y.color = 'black';
        z.parent.parent.color = 'red';
        z = z.parent.parent;
      } else {
        if (z === z.parent.right) {
          z = z.parent;
          leftRotate.call(this, z);
        }
        z.parent.color = 'black';
        z.parent.parent.color = 'red';
        rightRotate.call(this, z.parent.parent);
      }
    } else {
      y = z.parent.parent.left;
      if (y.color === 'red') {
        z.parent.color = 'black';
        y.color = 'black';
        z.parent.parent.color = 'red';
        z = z.parent.parent;
      } else {
        if (z === z.parent.left) {
          z = z.parent;
          rightRotate.call(this, z);
        }
        z.parent.color = 'black';
        z.parent.parent.color = 'red';
        leftRotate.call(this, z.parent.parent);
      }
    }
  }
  this.root.color = 'black';
}

function deletefixUp(z) {
  let node = z;
  while (node.parent.key !== undefined && node.color === 'black') {
    let w;
    if (node === node.parent.left) {
      w = node.parent.right;
      if (w.color === 'red') {
        w.color = 'black';
        node.parent.color = 'red';
        leftRotate.call(this, node.parent);
        w = node.parent.right;
      }
      if (w.left.color === 'black' && w.right.color === 'black') {
        w.color = 'red';
        node = node.parent;
      } else {
        if (w.right.color === 'black') {
          w.left.color = 'black';
          w.color = 'red';
          rightRotate.call(this, w);
          w = node.parent.right;
        }
        w.color = node.parent.color;
        node.parent.color = 'black';
        w.right.color = 'black';
        leftRotate.call(this, node.parent);
        node = this.root;
      }
    } else {
      w = node.parent.left;
      if (w.color === 'red') {
        w.color = 'black';
        node.parent.color = 'red';
        rightRotate.call(this, node.parent);
        w = node.parent.left;
      }
      if (w.right.color === 'black' && w.left.color === 'black') {
        w.color = 'red';
        node = node.parent;
      } else {
        if (w.left.color === 'black') {
          w.right.color = 'black';
          w.color = 'red';
          leftRotate.call(this, w);
          w = node.parent.left;
        }
        w.color = node.parent.color;
        node.parent.color = 'black';
        w.left.color = 'black';
        rightRotate.call(this, node.parent);
        node = this.root;
      }
    }
  }
  node.color = 'black';
}

class RBTree {
  constructor(comparator) {
    this.root = new RBNode();
    this.comp = comparator || defaultComp;
  }

  insert(key, value) {
    const insertedNode = BSTInsert.call(this, key, value, RBNode);
    if (insertedNode) {
      insertedNode.color = 'red';
      insertFix.call(this, insertedNode);
    }
  }

  find(key) {
    const node = BSTSearch.call(this, this.root, key);
    return node ? node.value : undefined;
  }

  remove(key) {
    const { x, y } = BSTRemove.call(this, key);
    if (y.color === 'black') {
      deletefixUp.call(this, x);
    }
    return true;
  }
}

module.exports = RBTree;
