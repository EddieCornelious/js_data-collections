function BSTInsert(key, value, Node) {
  let x = this.root;
  let z = new Node(key, value);
  let y = new Node();
  while (x.key !== undefined) {
    y = x;
    if (z.key < x.key) {
      x = x.left;
    } else if (z.key > x.key) {
      x = x.right;
    } else {
      return null;
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
  return z;
}

function search(root, key) {
  if (root.key === undefined) {
    return null;
  }
  if (root.key === key) {
    return root;
  }
  if (root.key < key) {
    return search(root.right, key);
  }
  return search(root.left, key);
}

function BSTRemove(key) {
  let node = search(this.root, key);

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
  if (!y.parent.key) {
    this.root = x;
  } else {
    if (y.key === y.parent.left.key) {
      y.parent.left = x;
    } else {
      y.parent.right = x;
    }
  }
  if (y.key !== node.key) {
    node.key = y.key;
    node.value = y.value;
  }
  return { y, x };
}
// TODO : return key and value LOLLLLLLLLLLLLLLLLLLLLLLL
function inorder(node) {
  if (node.key !== undefined) {
    let tmp = [];
    return tmp.concat(inorder(node.left.key), node.key, inorder(node.right.key));
  }
  return [];
}
module.exports = {
  BSTInsert,
  BSTRemove,
  search,
  inorder
};
