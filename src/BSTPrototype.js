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
function successor(node) {
  let suc = node.right;
  if (suc.left.key === undefined) {
    return suc;
  }
  while (suc.left.key !== undefined) {
    suc = suc.left;
  }
  return suc;
}
function numChildren(node) {
  const left = node.left.key;
  const right = node.right.key;
  if (left === undefined && right === undefined) {
    return 0;
  } else if (
    (left === undefined && right !== undefined) ||
    (right === undefined && left !== undefined)) {
    return 1;
  }
  return 2;
}
function remove0(node, NodeType) {
  const comp = this.comp;
  if (comp(this.root.key, node.key) === 0) {
    this.root = new NodeType();
    return;
  }
  const parent = node.parent;
  if (comp(parent.right.key, node.key) === 0) {
    parent.right = node.right;
  } else {
    parent.left = node.left;
  }
}

function remove1(node) {
  const comp = this.comp;
  if (comp(node.key, this.root.key) === 0) {
    const root = this.root;
    if (root.left.key !== undefined) {
      this.root = root.left;
      root.left.parent = root.parent;
    } else {
      this.root = root.right;
      root.right.parent = root.parent;
    }
    return;
  }
  // node to delete is left child
  const parent = node.parent;
  if (comp(parent.left.key, node.key) === 0) {
    if (node.right.key !== undefined) {
      parent.left = node.right;
      node.right.parent = parent;
    } else {
      parent.left = node.left;
      node.left.parent = parent;
    }
    return;
  }
  // node to delete is right child
  if (node.right.key !== undefined) {
    parent.right = node.right;
    node.right.parent = parent;
  } else {
    parent.right = node.left;
    node.left.parent = parent;
  }
}

function remove2(node) {
  const nodeSucc = successor(node);
  const oldKey = node.key;
  node.key = nodeSucc.key;
  node.value = nodeSucc.value;
  nodeSucc.key = oldKey;
  // successor can only have one child at most and must be right child, left child is
  // contradiction
  const succChildren = numChildren(nodeSucc);
  if (succChildren === 0) {
    return remove0.call(this, nodeSucc);
  }
  return remove1.call(this, nodeSucc);
}

function BSTRemove(key, nodeType) {
  let node = search.call(this, this.root, key);
  if (!node) {
    return false;
  }
  const children = numChildren(node);
  if (children === 0) {
    remove0.call(this, node, nodeType);
    return;
  } else if (children === 1) {
    remove1.call(this, node);
    return;
  }
  remove2.call(this, node, nodeType);
}

function inorder(node) {
  if (node && node.key !== undefined) {
    let tmp = [];
    return tmp.concat(inorder(node.left), node, inorder(node.right));
  }
  return [];
}
module.exports = {
  BSTInsert,
  BSTRemove,
  search,
  inorder
};
