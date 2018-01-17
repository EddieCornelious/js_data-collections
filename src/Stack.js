import List from './List.js';

/**
 * Stack representation
 * @class
 *
 * @example
 * const stack = new Collections.Stack();
 * // FOR ALL EXAMPLES BELOW. ASSUME stack IS CLEARED BEFORE EACH EXAMPLE
 */
class Stack {
  constructor() {
    this.stack = new List();
  }

  /**
   * Pushes the given data onto the stack
   * @param {data} data - The data to push onto stack
   * @returns {Stack} The instance this method was called
   *
   * @example
   * stack.push(1).push(2);
   */
  push(data) {
    this.stack.addToFront(data);
    return this;
  }

  /**
   * Removes data from stack in a last in first out manner
   * @returns {*} The reomved data
   *
   * @example
   * // FROM example above
   * stack.pop(); // result is 2
   */
  pop() {
    return this.stack.removeFront();
  }

  /**
   * Reports but does not remove the staged element to be removed next
   * @returns {*} Element staged to be removed next
   *
   * @example
   * stack.enqueue(1);
   * queue.peek() // returns 1 but does not remove it
   */
  peek() {
    return this.stack.elementAtIndex(0);
  }

  /**
   * Reports the size of the queue
   * @returns {number} The size of the queue
   */
  size() {
    return this.stack.size();
  }
}

module.exports = Stack;

