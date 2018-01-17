const List = require('./List.js');

/**
 * Queue Representation
 * @class
 *
 * @example
 * const queue = new Structs.Queue();
 * // FOR ALL EXAMPLES BELOW. ASSUME queue IS CLEARED BEFORE EACH EXAMPLE
 */
class Queue {
  constructor() {
    this.queue = new List();
  }

  /**
   * Inserts given data into queue
   * @param {*} data - Data to insert into queue
   * @returns {Queue} The instance that this method was called
   *
   * @example
   * queue.enqueue(1).enqueue(2);
   *
   */
  enqueue(data) {
    const { queue } = this;
    queue.addToBack(data);
    return this;
  }

  /**
   * Removes from queue in a First in first out manner
   * @returns {*} The removed data
   * @example
   * // FROM example above
   * queue.dequeue() // 1 as it was inserted first
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
    const { queue } = this;
    return queue.elementAtIndex(0);
  }

  /**
   * Reports the size of the queue
   * @returns {number} The size of the queue
   */
  size() {
    return this.queue.size();
  }
}

module.exports = Queue;
