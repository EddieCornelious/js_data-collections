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

  isRightChild() {
    return this.parent.right === this;
  }
}

export default BSTNode;
