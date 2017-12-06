
function getNode(index) {
  let head = this.head;
  if (index < 0 || !head) {
    throw new RangeError('out of bounds');
  }
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

function isNumber(obj) {
  if (typeof obj !== 'number') {
    throw new TypeError('Invalid index must be of type number');
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
/**
 * Nodes for Linked List
 * @class
 * @private
 **/
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
/**Linked List Representation
 * @class
 * @public
 * @example 
 * const list = new Structs.List();
 **/
class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  /** Adds data to far left of list
   * @public
   * @param {Object} data the info to insert into front of list
   * @returns {@this List}
   * @example
   * list.addToFront("a")
   * .addToFront("b")
   * //result is <"b", "a">
   **/
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
  /** returns element at the given index
   * @public
   * @param {Object} index- data at selected index
   * @returns {Object} data field of list node or throws error
   * if index out of bounds
   * @example
   * list.addTOFront("a");
   * .addTOFront("b");
   * .addTOFront("c");
   * list.elementAtIndex(1);
   * //returns b
   **/
  elementAtIndex(index) {
    isNumber(index);
    const wanted = getNode.apply(this, [index]);
    return wanted ? wanted.data : undefined;
  }
  /** Adds data to far right of list
   * @public
   * @param {Object} data to insert into front of list
   * @returns {@this List}
   **/
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
  /** removes data from far left of list
   * @public
   * @returns {Object} removed item
   **/
  removeFront() {
    const { head, length } = this;
    let removed;
    if (head) {
      removed = head.data;
      this.length = length - 1;
      this.head = head.next;
      const newHead = this.head;
      // list is now empty...adjust tail
      if (!newHead) {
        this.tail = this.head;
        return removed;
      }
      newHead.prev = null;
    }
    return removed;
  }
  /** removes data from far right of list
   * @public
   * @returns {Object} removed item
   **/
  removeBack() {
    const { tail, length } = this;
    if (!this.tail) {
      return this;
    }
    let removed = tail.data;
    const prev = tail.prev;
    this.length = length - 1;
    // list now empty
    if (!prev) {
      this.tail = null;
      this.head = null;
      return removed;
    }
    prev.next = null;
    this.tail = prev;
    return removed;
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
    const data = node.data;
    const del = node.next;
    const after = del.next;
    node.next = after;
    after.prev = node;
    this.length = length - 1;
    return data;
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
