function getNode(index) {
  if (index < 0) {
    throw new RangeError('out of bounds');
  }
  let head = this.head;
  let i = 0;
  while (i < index) {
    head = head.next;
    i += 1;
    if (!head) {
      throw new RangeError('index out of Bounds');
    }
  }

  return head;
}

function ListIterator() {
  const context = this;
  let list = context.head;
  const iterator = {};

  iterator.next = function next() {
    if (this.hasNext()) {
      const data = list.next.data;
      return data;
    }
    this.reset();
  };

  iterator.prev = function prev() {
    if (this.hasPrev()) {
      const data = list.prev.data;
      return data;
    }
    this.reset();
  };

  iterator.hasNext = function hasNext() {
    return list && list.next !== null;
  };

  iterator.hasPrev = function hasPrev() {
    return list && list.prev !== null;
  };

  iterator.reset = function reset() {
    list = context.head;
  };
  return iterator;
}
// TODO: add the below functions to prototype of base classes

function isNumber(obj) {
  if (typeof obj !== 'number') {
    throw new TypeError('Invalid index must be of typ number');
  }
  return 1;
}

function defaultEqual(a, b) {
  if (a < b) {
    return -1;
  } else if (a === b) {
    return 0;
  }
  return 1;
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.iterator = ListIterator.apply(this, []);
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

  removeFront() {
    const { head, length } = this;

    if (head) {
      this.length = length - 1;
      this.head = head.next;
      const newHead = this.head;
      // list is now empty...adjust tail
      if (!newHead) {
        this.tail = this.head;
        return this;
      }
      newHead.prev = null;
    }
    return this;
  }

  removeBack() {
    const { tail, length } = this;
    if (!this.tail) {
      return this;
    }
    const prev = tail.prev;
    this.length = length - 1;
    // list now empty
    if (!prev) {
      this.tail = null;
      this.head = null;
      return this;
    }
    prev.next = null;
    this.tail = prev;
    return this;
  }

  insert(index, data) {
    isNumber(index);
    if (index === 0) {
      return this.addToFront(data);
    } else if (index === this.length) {
      return this.addToBack(data);
    }
    const node = getNode.apply(this, [index - 1]);
    const newNode = new Node(data);
    const aft = node.next;
    newNode.next = aft;
    aft.prev = newNode;
    node.next = newNode;
    newNode.prev = node;
    this.length += 1;
    return this;
  }


  remove(index) {
    isNumber(index);
    const { head, length } = this;
    if (!head) {
      return this;
    }

    if (index === 0) {
      return this.removeFront();
    } else if (index === length) {
      return this.removeBack();
    }
    const node = getNode.apply(this, [index - 1]);
    const del = node.next;
    const after = del.next;
    node.next = after;
    after.prev = node;
    this.length = length - 1;
    return this;
  }

  indexOf(data, eqlFunc) {
    const cmp = eqlFunc || defaultEqual;
    let index = 0;
    let head = this.head;
    while (head) {
      if (cmp(data, head.data) === 0) {
        return index;
      }
      head = head.next;
      index += 1;
    }
    return -1;
  }

  contains(data, eqlFunc) {
    return this.indexOf(data, eqlFunc) !== -1;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return !this.head && !this.tail;
  }

  forEach(callback) {
    const func = callback;
    let head = this.head;

    while (head) {
      func(head.data);
      head = head.next;
    }
    return this;
  }

  toArray() {
    const temp = [];
    this.forEach(element => temp.push(element));
    return temp;
  }
}

module.exports = List;
