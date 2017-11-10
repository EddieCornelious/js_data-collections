function BSTInsert(key = null, value = null, Node) {
  const comp = this.comp;
  let x = this.root;
  let z = new Node(key, value);
  let y = new Node();
  while (x.key !== undefined) {
    y = x;
    if (comp(z.key, x.key) === -1) {
      x = x.left;
    } else if (comp(z.key, x.key) === 1) {
      x = x.right;
    } else {
      x.value = value;
      return null;
    }
  }
  z.parent = y;
  if (y.key === undefined) {
    this.root = z;
  } else if (comp(z.key, y.key) === -1) {
    y.left = z;
  } else {
    y.right = z;
  }
  z.left = new Node();
  z.right = new Node();
  return z;
}

function search(root, key) {
  const comp = this.comp;
  if (!root || root.key === undefined) {
    return null;
  }
  if (comp(root.key, key) === 0) {
    return root;
  }
  if (comp(root.key, key) === -1) {
    return search.call(this, root.right, key);
  }
  return search.call(this, root.left, key);
}

function BSTRemove(key) {
  let node = search.call(this, this.root, key);
  const comp = this.comp;
  if (!node) {
    return false;
  }
  let y;
  let x;
  if (node.left.key === undefined || node.right.key === undefined) {
    y = node;
  } else {
    let SRST = node.right;
    while (SRST.key !== undefined) {
      if (SRST.left.key === undefined) {
        break;
      }
      SRST = SRST.left;
    }
    y = SRST;
  }
  if (y.left.key !== undefined) {
    x = y.left;
  } else {
    x = y.right;
  }
  x.parent = y.parent;
  if (y.parent.key === undefined) {
    this.root = x;
  } else {
    if (comp(y.key, y.parent.left.key) === 1) {
      y.parent.left = x;
    } else {
      y.parent.right = x;
    }
  }
  if (comp(y.key, node.key) !== 0) {
    node.key = y.key;
    node.value = y.value;
  }
  return { y, x };
}

function inorder(node) {
  if (node && node.key !== undefined) {
    let tmp = [node.key];
    return tmp.concat(inorder(node.left),inorder(node.right));
  }
  return [];
}
module.exports = {
  BSTInsert,
  BSTRemove,
  search,
  inorder
};
