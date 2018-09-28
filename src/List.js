import {defaultComparator} from './Util.js';

/**
 * Returns the node at given index in linked list
 * @private
 * @param {number} index - The index of the node to return
 * @throws {TypeError} When @param index is not a number
 * @returns {(Node|undefined)} Node @param index or undefined if not found
 */
function getNode(index) {
  let head = this.head;
  if (index < 0 || !head) {
    return;
  }
  let i = 0;
  while (i < index) {
    head = head.next;
    i += 1;
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
 * const list = new Collections.LinkedList();
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
   * @param {*} data - The data to insert
   * @returns {List} The instance this method was called
   *
   * @example
   * list.addToFront("a")
   *  .addToFront("b"); // list is <"b", "a">
   */
  addToFront(data) {
    const {head, length} = this;
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
   * @param {number} index - The index to look at
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
    const foundNode = getNode.call(this, index);
    return foundNode ? foundNode.data : undefined;
  }

  /**
   * Adds the given data to right-most end of linked list
   * @param {*} data - the data to insert
   * @returns {List} The instance this method was called
   *
   * @example
   * list.addToBack("a")
   *  .addToBack("b"); // list is <"a", "b">
   */
  addToBack(data) {
    const {tail, length} = this;
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
    const {head, length} = this;
    let removedData;
    if (head) {
      removedData = head.data;
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
    return removedData;
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
    const {tail, length} = this;
    let removedData;
    if (tail) {
      removedData = tail.data;
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
    return removedData;
  }

  /**
   * Inserts given data into specific position in the linked list
   * @param {index} index - The index to insert data into
   * @param {*} data - The data to insert into @param index
   * @throws {TypeError} Will throw error if @param index is not number
   * @returns {List} - The instance this method was called
   *
   * @example
   * list.addToBack("a")
   *  .addToBack("b");
   * list.insert(1, "$");
   * // list is now <"a, "$, "b">
   */
  insert(index = 0, data) {
    const {length} = this;
    if (index === 0) {
      return this.addToFront(data);
    } else if (index >= length) {
      return this.addToBack(data);
    }
    // parent of wanted node
    const parentNode = getNode.call(this, index - 1);
    if (parentNode) {
      const newNode = new Node(data);
      const oldParentNext = parentNode.next;
      newNode.next = oldParentNext;
      oldParentNext.prev = newNode;
      parentNode.next = newNode;
      newNode.prev = parentNode;
      this.length = length + 1;
    }
    return this;
  }

  /**
   * Removes data at specific position in the linked list
   * @param {index} index - The index to insert data into
   * @throws {TypeError} Will throw error if @param index is not number
   * @returns {(*|undefined)} The removed data or undefined if nothing removed
   *
   * @example
   * list.addToBack("a")
   *  .addToBack("b");
   * list.remove(1);
   * // list is now <"a">
   */
  remove(index) {
    const {length} = this;
    let removedData;
    if (index === 0) {
      return this.removeFront();
    } else if (index >= length - 1) {
      return this.removeBack();
    }
    // parent of wanted node
    const parentNode = getNode.call(this, index - 1);
    if (parentNode) {
      const toRemove = parentNode.next;
      removedData = toRemove.data;
      const toRemoveNext = toRemove.next;
      parentNode.next = toRemoveNext;
      toRemoveNext.prev = parentNode;
      this.length = length - 1;
    }
    return removedData;
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
    const cmp = comparator || defaultComparator;
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
   * Empties the List
   * @returns {undefined}
   */
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Returns the size of the List
   * @returns {number} The size of the List
   */
  size() {
    return this.length;
  }

  /**
   * Calls a callback function for each element in the list
   * @param {function} predicate - Function executed for each element
   * (data, index)
   * @returns {List} The instance that this method was called
   */
  forEach(predicate) {
    let head = this.head;
    let index = 0;
    while (head) {
      predicate(head.data, index);
      head = head.next;
      index += 1;
    }
    return this;
  }

  /**
   * Returns a new list with only elements that return truthy when passed to the
   * given callback
   * @param {function(data)} predicate - The function used to evaluate elements
   * @returns {List} A new list with filtered elements
   */
  filter(predicate) {
    let head = this.head;
    const newList = new List();
    let data;
    while (head) {
      data = head.data;
      if (predicate(data)) {
        newList.addToBack(data);
      }
      head = head.next;
    }
    return newList;
  }

  /**
   * Reports if every element in the list passes a certain condition
   * @param {function(data)} predicate - The function used for evaluations
   * @returns {boolean} True if every element passes the test and false otherwise
   */
  every(predicate) {
    let head = this.head;
    while (head) {
      if (!predicate(head.data)) {
        return false;
      }
      head = head.next;
    }
    return true;
  }

  /**
   * Reports if at least one element in the list passes a certain condition
   * @param {function(data)} predicate - The function used for evaluations
   * @returns {boolean} True if one or more elements passes the test and false otherwise
   */
  some(predicate) {
    let head = this.head;
    while (head) {
      if (predicate(head.data)) {
        return true;
      }
      head = head.next;
    }
    return false;
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

export default List;
