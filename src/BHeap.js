import {swap, defaultComp} from './Util.js';

/**
 * Sifts down (swaps elements downward) the given array
 * @private
 * @param {Array} array - The array to sift down on.
 * @param {number} index - The index to start the sift down operation.
 * @param {function} comp - The comparator to use against parent and
 * child elements.
 * @returns {undefined}
 */
function heapify(array, index, comp) {
  const left = 2 * index;
  const right = 2 * index + 1;
  const numIndicies = array.length - 1;
  let largest;

  if (left <= numIndicies && comp(array[left], array[index]) === 1) {
    largest = left;
  } else {
    largest = index;
  }

  if (right <= numIndicies && comp(array[right], array[largest]) === 1) {
    largest = right;
  }

  if (largest !== index) {
    swap(array, index, largest);
    heapify(array, largest, comp);
  }
}

/**
 * Sifts up (swaps elements upward) the given array
 * @private
 * @param {Array} array - The array to sift up on.
 * @param {number} index - The index to start the sift up operation.
 * @param {function} comp - The comparator to use against parent
 * and child elements
 * @returns {undefined}
 */
function siftUp(array, index, comp) {
  if (index > 1) {
    const parent = Math.floor(index / 2);
    if (comp(array[parent], array[index]) === -1) {
      swap(array, parent, index);
      siftUp(array, parent, comp);
    }
  }
}

/**
 * Binary heap representation
 * @class
 * @param {function} comparator - @see Global#defaultComp for examples
 * @example
 * const heap = new Collections.BHeap();
 * // this creates a max heap by default.
 * // for a min heap, see @link above and swap 1 and -1
 * // FOR ALL EXAMPLES BELOW. ASSUME heap IS CLEARED BEFORE EACH EXAMPLE
 */
class BHeap {
  constructor(comparator) {
    this.heap = [null];
    this.comp = comparator || defaultComp;
  }

  /**
   * Removes the root of the BHeap and returns the data
   * @returns {*} The extracted data
   *
   * @example
   * heap.insert(1).insert(2).insert(3);
   * let root = heap.extractRoot();
   * // root = 3;
   */
  extractRoot() {
    const {heap, comp} = this;
    let max = heap[1];
    heap[1] = heap[heap.length - 1];
    heap.length -= 1;
    heapify(heap, 1, comp);
    return max;
  }

  /**
   * Inserts the given data into the BHeap
   * @param {*} [data=null] - The data to insert into BHeap.
   * @returns {BHeap} A reference to the instance that this method was called
   *
   * @example
   * heap.insert(1).insert(2).insert(3).insert(3);
   * // this heap will contain both 3s
   *
   * heap.extractRoot() // will be 3
   */
  insert(data = null) {
    const {heap, comp} = this;
    heap[heap.length] = data;
    siftUp(heap, heap.length - 1, comp);
    return this;
  }

  /**
   * Reports whether the BHeap contains the given data
   * @param {*} [data=null] - The data to search for
   * @returns {boolean} True if the heap contains @param data and false otherwise
   *
   * @example
   * heap.insert(1).insert(2);
   * heap.contains(2) // true
   */
  contains(data = null) {
    return this.toArray().indexOf(data) !== -1;
  }

  /**
   * Retrieves the element staged to be removed next but does not remove it
   * @returns {* | undefined} The set to be removed data or undefined if empty heap
   *
   * @example
   * heap.insert(9);
   * heap.peek() // returns 9 and heap is still of size 1
   */
  peek() {
    return this.heap[1];
  }

  /**
   * Transforms the BHeap into an array
   * @returns {Array} The heap instance as an array
   *
   * @example
   * heap.insert(1).insert(2);
   * heap.toArray() // will be [2, 1]
   */
  toArray() {
    return this.heap.slice(1);
  }

  /**
   * Reports the number of elements in the BHeap.
   * @returns The BHeap instance's number of elements
   *
   * @example
   * heap.size() // would be 0
   */
  size() {
    return this.heap.length - 1;
  }

  /**
   * Empties the Heap
   * @returns {undefined}
   */
  clear() {
    this.heap.length = 1;
  }
}

export default BHeap;
