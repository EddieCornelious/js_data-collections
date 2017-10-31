
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
}

function insertFix(node) {
  while (node.parent && node.parent.parent && node.parent.color === 'red') {
    let uncle;
    if (node.parent.key === node.parent.parent.left.key) {
      uncle = node.parent.parent.right;
      if (uncle.color === 'red') {
        node.parent.color = 'black';
        uncle.color = 'black';
        node = node.parent.parent;
        node.color = 'red';
      } else {
        if (node.key === node.parent.right.key) {
          node = node.parent;
          leftRotate.apply(this, [node]);
        }
        node.parent.color = 'black';
        node.parent.parent.color = 'red';
        rightRotate.apply(this, [node.parent.parent]);
      }
    } else if (node.parent.key === node.parent.parent.right.key) {
      uncle = node.parent.parent.left;
      if (uncle.color === 'red') {
        node.parent.color = 'black';
        uncle.color = 'black';
        node = node.parent.parent;
        node.color = 'red';
      } else {
        if (node.key === node.parent.left.key) {
          node = node.parent;
          rightRotate.apply(this, [node]);
        }
        node.parent.color = 'black';
        node.parent.parent.color = 'red';
        leftRotate.apply(this, [node.parent.parent]);
      }
    }
  }
  this.root.color = 'black';
}

function deletefixUp(node) {
  while (node.parent.key !== undefined && node.color === 'black') {
    let w;
    if (node.key === node.parent.left.key) {
      w = node.parent.right;
      if (w.color === 'red') {
        w.color = 'black';
        node.parent.color = 'red';
        leftRotate.apply(this, [node.parent]);
        w = node.parent.right;
      }
      if (w.left.color === 'black' && w.right.color === 'black') {
        w.color = 'red';
        node = node.parent;
      } else {
        if (w.right.color === 'black') {
          w.left.color = 'black';
          w.color = 'red';
          rightRotate.apply(this, [w]);
          w = node.parent.right;
        }
        w.color = node.parent.color;
        node.parent.color = 'black';
        w.right.color = 'black';
        leftRotate.apply(this, [node.parent]);
        node = this.root;
      }
    } else {
      w = node.parent.left;
      if (w.color === 'red') {
        w.color = 'black';
        node.parent.color = 'red';
        rightRotate.apply(this, [node.parent]);
        w = node.parent.left;
      }
      if (w.right.color === 'black' && w.left.color === 'black') {
        w.color = 'red';
        node = node.parent;
      } else {
        if (w.left.color === 'black') {
          w.right.color = 'black';
          w.color = 'red';
          leftRotate.apply(this, [w]);
          w = node.parent.left;
        }
        w.color = node.parent.color;
        node.parent.color = 'black';
        w.left.color = 'black';
        rightRotate.apply(this, [node.parent]);
        node = this.root;
      }
    }
  }
  node.color = 'black';
}
module.exports = { insertFix, deletefixUp };
