import List from './List.js';

/**
 * Queue Representation
 * @class
 *
 * @example
 * const queue = new Collections.Queue();
 * // FOR ALL EXAMPLES BELOW. ASSUME queue IS CLEARED BEFORE EACH EXAMPLE
 */
class Queue {
  constructor() {
    this.queue = new List();
  }

  /**
   * Inserts given data into queue
   * @param {*} data - The data to insert into queue
   * @returns {Queue} The instance that this method was called
   *
   * @example
   * queue.enqueue(1).enqueue(2);
   *
   */
  enqueue(data) {
    this.queue.addToBack(data);
    return this;
  }

  /**
   * Removes from the queue in a first in first out manner
   * @returns {*} The removed data
   * @example
   * queue.enqueue(1).enqueue(2);
   * queue.dequeue() // 1
   */
  dequeue() {
    return this.queue.removeFront();
  }

  /**
   * Reports but does not remove the staged element to be removed next
   * @returns {*} Element staged to be removed next
   *
   * @example
   * queue.enqueue(1);
   * queue.peek() // returns 1 but does not remove it
   */
  peek() {
    return this.queue.elementAtIndex(0);
  }

  /**
   * Empties the Queue
   * @returns {undefined}
   */
  clear() {
    return this.queue.clear();
  }

  /**
   * Reports the size of the queue
   * @returns {number} The size of the queue
   */
  size() {
    return this.queue.size();
  }
}

export default Queue;
