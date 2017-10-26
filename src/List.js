/**
 * @access private {class}
 * */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class List {
  constructor() {
    this._head = null;
    this.tail = null;
    this.length = 0;
  }

  addToFront(data) {
    const { head, length } = this;
    const newNode = new Node(data);
    this.length = length + 1;

    if (!head) {
      this.head = newNode;
      this.tail = this.head;
      return this;
    }
    this.head = newNode;
    newNode.next = head;
    head.prev = newNode;
    return this;
  }


  addToBack(data) {
    const { tail, length } = this;
    const newNode = new Node(data);
    this.length = length + 1;

    if (!tail) {
      this.head = newNode;
      this.tail = this.head;
      return this;
    }
    this.tail = newNode;
    newNode.prev = tail;
    tail.next = newNode;
    return this;
  }
}

module.exports = List;
