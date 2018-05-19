import BHeap from './BHeap.js';
import { isNumber } from './Util.js';

/**
 * Custom comparator for min heap
 * @private
 * @param {valueA} valueA - First value to compare
 * @param {valueB} valueB- Second value to compare
 * @returns {number} 1 if @param valueA's priority is less than
 * valueB's priority, -1 if opposite and 0 if the two priorities are equal.
 */
function minHeapComparator(valueA, valueB) {
  if (valueA.priority < valueB.priority) {
    return 1;
  }
  if (valueA.priority === valueB.priority) {
    return 0;
  }
  return -1;
}

/**
 * Priority Queue Representation
 * @class
 *
 * @example
 * const pq = new Collections.PriorityQueue();
 * // FOR ALL EXAMPLES BELOW. ASSUME pq IS CLEARED BEFORE EACH EXAMPLE
 */
class PriorityQueue {
  constructor() {
    this.queue = new BHeap(minHeapComparator);
  }

  /**
   * Inserts given data into queue with a certain priority
   * Lower numbers are removed from queue first.
   * @param {*} data - The data to queue
   * @param {priority} priority - The relative Importance of @param data
   * to othe data in the queue
   *
   * @example
   * pq.enqueue("wakeup", 1);
   * pq.enqueue("wash dishes", 2);
   *
   */
  enqueue(data, priority) {
    isNumber(priority);
    return this.queue.insert({ data, priority });
  }

  /**
   * Removes The element with the lowest priority from the queue
   * @returns {*} The element with the lowest priority in the queue
   * pq.dequeue()
   * // from the example above, this operation returns "wakeup", then
   * "wash dishes" on second dequeue
   */
  dequeue() {
    const { queue } = this;
    return queue.extractRoot().data;
  }

  /**
   * Reports the size of the priorityqueue
   * @returns {number} The size of the queue
   */
  size() {
    return this.queue.size();
  }

  /**
  * Removes all elements from the PriorityQueue
  * @returns {undefined}
  */
  clear() {
    return this.queue.clear();
  }
}

export default PriorityQueue;
