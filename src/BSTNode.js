class BSTNode {
  constructor(key, value) {
    this.parent = null;
    this.left = null;
    this.right = null;
    this.key = key;
    this.value = value;
  }

  isLeftChild() {
    return this.parent.left === this;
  }

  hasLeftChild() {
    return this.left.key !== undefined;
  }

  hasRightChild() {
    return this.right.key !== undefined;
  }

  isRightChild() {
    return this.parent.right === this;
  }
}

export default BSTNode;
