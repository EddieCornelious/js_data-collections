import {
  isNumber,
  defaultComp
} from './Util.js';

/**
 * Returns the node at given index in linked list
 * @private
 * @param {number} index - The index of the node to return
 * @throws {TypeError} When @param index is not a number
 * @returns {(Node|undefined)} Node @param index or undefined if not found
 */
function getNode(index) {
  isNumber(index);
  let head = this.head;
  if (index < 0 || !head) {
    return;
  }
  let i = 0;
  while (i < index) {
    head = head.next;
    i += 1;
    // index wanted is > than list size
    if (!head) {
      return;
    }
  }
  return head;
}

/**
 * Linked List Node
 * @private
 * @class
 * @param {*} The data to assign to the node
 */
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    // previous node
    this.prev = null;
  }
}

/**
 * Linked List representation
 * @class
 *
 * @example
 * const list = new Structs.LinkedList();
 * // FOR ALL EXAMPLES BELOW. ASSUME list IS CLEARED BEFORE EACH EXAMPLE
 */
class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Adds the given data to left-most end of linked list
   * @param {*} data - Data to insert
   * @returns {List} The instance this method was called
   *
   * @example
   * list.addToFront("a")
   *  .addToFront("b"); // list is <"b", "a">
   */
  addToFront(data) {
    const { head, length } = this;
    const newNode = new Node(data);
    if (!head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      // non-empty list
      this.head = newNode;
      newNode.next = head;
      head.prev = newNode;
    }
    this.length = length + 1;
    return this;
  }

  /**
   * Returns the data at given index
   * @param {number} index - Index to look at
   * @throws {TypeError} Will throw error if @param index is not number
   * @returns {(*|undefined)} Index of element if @param index is in range
   * or undefined
   *
   * @example
   * list.addToFront("a")
   *  .addToFront("b")
   *  .addToFront("c");
   * const getSomething = list.elementAtIndex(2); // "a"
   * list.elementAtIndex(13); // undefined
   */
  elementAtIndex(index = 0) {
    isNumber(index);
    const wanted = getNode.call(this, index);
    return wanted ? wanted.data : undefined;
  }

  /**
   * Adds the given data to right-most end of linked list
   * @param {*} data - Data to insert
   * @returns {List} The instance this method was called
   *
   * @example
   * list.addToBack("a")
   *  .addToBack("b"); // list is <"a", "b">
   */
  addToBack(data) {
    const { tail, length } = this;
    const newNode = new Node(data);
    if (!tail) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail = newNode;
      newNode.prev = tail;
      tail.next = newNode;
    }
    this.length = length + 1;
    return this;
  }

  /**
   * Removes the left-most element in the linked list
   * @returns {(*|undefined)} The removed data or undefined if nothing removed
   *
   * @example
   * list.addToBack("a")
   *  .addToBack("b");
   * const removedData = list.removeFront(); // "a"
   * // list is now <"b">
   */
  removeFront() {
    const { head, length } = this;
    let removed;
    if (head) {
      removed = head.data;
      this.length = length - 1;
      this.head = head.next;

      // current state after removal
      const newHead = this.head;
      // list is now empty...adjust tail
      if (!newHead) {
        this.tail = null;
        this.head = this.tail;
      } else {
        // front of list rule
        newHead.prev = null;
      }
    }
    return removed;
  }

  /**
   * Removes the right-most element in the linked list
   * @returns {(*|undefined)} The removed data or undefined if nothing removed
   *
   * @example
   * list.addToBack("a")
   *  .addToBack("b");
   * const removedData = list.removeBack(); // "b"
   * // list is now <"a">
   */
  removeBack() {
    const { tail, length } = this;
    let removed;
    if (tail) {
      removed = tail.data;
      const prev = tail.prev;
      this.length = length - 1;
      // list now empty
      if (!prev) {
        this.tail = null;
        this.head = this.tail;
      } else {
        prev.next = null;
        this.tail = prev;
      }
    }
    return removed;
  }

  /**
   * Inserts given data into specific position in the linked list
   * @param {index} index - Index to insert data into
   * @param {*} data - Data to insert into @param index
   * @returns {List} - The instance this method was called
   *
   * @example
   * list.addToBack("a")
   *  .addToBack("b");
   * list.insert(1, "$");
   * // list is now <"a, "$, "b">
   */
  insert(index = 0, data) {
    isNumber(index);
    const { length } = this;
    if (index === 0) {
      return this.addToFront(data);
    } else if (index >= length) {
      return this.addToBack(data);
    }
    // parent of wanted node
    const prevNode = getNode.call(this, index - 1);
    if (prevNode) {
      const newNode = new Node(data);
      const aft = prevNode.next;
      newNode.next = aft;
      aft.prev = newNode;
      prevNode.next = newNode;
      newNode.prev = prevNode;
      this.length = length + 1;
    }
    return this;
  }

  /**
   * Removes data at specific position in the linked list
   * @param {index} index - Index to insert data into
   * @returns {(*|undefined)} The removed data or undefined if nothing removed
   *
   * @example
   * list.addToBack("a")
   *  .addToBack("b");
   * list.remove(1);
   * // list is now <"a">
   */
  remove(index) {
    isNumber(index);
    const { length } = this;
    let removed;
    if (index === 0) {
      return this.removeFront();
    } else if (index >= length) {
      return this.removeBack();
    }
    // parent of wanted node
    const prevNode = getNode.call(this, index - 1);
    if (prevNode) {
      const toRemove = prevNode.next;
      removed = toRemove.data;
      const after = toRemove.next;
      prevNode.next = after;
      after.prev = prevNode;
      this.length = length - 1;
    }
    return removed;
  }

  /**
   * Returns the index of the given data in the linked list
   * @param {*} data - The data to find index of
   * @param {function} comparator - function to compare for equality
   * @returns {number} The index of @param data or -1 if not found
   *
   * @example
   * const customComparator = function(a, b) {
   *   if(a.age < b.age) { return -1;}
   *   else if(a.age > b.age) { return 1:}
   *   else { return 0; }
   * }
   * list.addToBack({ age : 2})
   *  .addToBack({ age : 3});
   * list.indexOf({ age : 2}, customComparator) // 0
   */
  indexOf(data, comparator) {
    const cmp = comparator || defaultComp;
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

  /**
   * Returns whether the linked list contains the given data
   * @param {*} data - The data to insert into linked list
   * @param {function} comparator - function to compare for equality
   * @returns {number} The index of @param data or -1 if not found
   */
  contains(data, comparator) {
    return this.indexOf(data, comparator) !== -1;
  }

  /**
   * Empties the called instance
   * @returns {undefined}
   */
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Returns the size of the linked list
   * @returns {number} The size of the linked list
   */
  size() {
    return this.length;
  }

  /**
   * Returns whether the linked list has elements in it
   * @returns {boolean} True if the list has elements and false otherwise
   */
  isEmpty() {
    return !this.head && !this.tail;
  }

  /**
   * Calls a callback function for each element in the list
   * @param {function} callback - Function executed for each element
   * (data, index)
   * @returns {List} The instance that this method was called
   */
  forEach(callback) {
    const func = callback;
    let head = this.head;
    let index = 0;
    while (head) {
      func(head.data, index);
      head = head.next;
      index += 1;
    }
    return this;
  }

  /**
   * Transforms a linked list to an array
   * @returns {Array} An array representation of 'this' List
   */
  toArray() {
    const temp = [];
    this.forEach(element => temp.push(element));
    return temp;
  }
}


module.exports = List;
