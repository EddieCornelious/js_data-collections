import { swap, defaultComp } from './Util.js';

/**
 * @private
 * @param {Array} array - Array to sift down on.
 * @param {number} index - Index to start the sift down operation.
 * @param {function} comp - Comparator to use against parent and child elements.
 * @returns {undefined}
 */
function heapify(array, index, comp) {
  const left = (2 * index);
  const right = (2 * index) + 1;
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
 * @private
 * @param {Array} array - array to sift up on.
 * @param {number} index - index to start the sift up operation.
 * @param {function} comp - comparator to use against parent and child elements.
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
 * @param {function} [comparator] - Function used to
 * compare parent and child for heap operations
 * @example
 * const heap = new Structs.BHeap();
 * // this creates a max heap by default.
 * function (a, b){
     if (a < b) {
       return -1;
    } else if (a > b) {
       return 1;
    } else {
       return 0;
    }
 }
 * // to get a min heap swap -1 and 1
 * // you can also use a custom comparator for objects : For example,
 * // if your ojects have the pattern
 * // user {id : "", age: 22} simply put something like
 * if (a.age < b.age) {
        return -1;
 }........
 * // this will give u the person with the highest age at the top of the heap.
 * // FOR ALL EXAMPLES BELOW. ASSUME heap IS CLEARED BEFORE EACH EXAMPLE
 */
class BHeap {
  constructor(comparator) {
    this.heap = [null];
    this.comp = comparator || defaultComp;
  }

  /**
   * Removes the root of the heap and returns the data
   * @returns {*} Extracted data
   *
   * @example
   * heap.insert(1).insert(2).insert(3);
   * let root = heap.extractRoot();
   * // root = 3;
   */
  extractRoot() {
    const heap = this.heap;
    let max = heap[1];
    heap[1] = heap[heap.length - 1];
    heap.length -= 1;
    heapify(heap, 1, this.comp);
    return max;
  }

  /**
   * Inserts given data into BHeap
   * @param {*} data - Data to insert into heap.
   * @returns {BHeap} A reference to the instance that this method was called
   *
   * @example
   * heap.insert(1).insert(2).insert(3).insert(3);
   * // this heap will contain both 3s
   * // heap.extractRoot() // will be 3
   */
  insert(data) {
    const heap = this.heap;
    heap[heap.length] = data;
    siftUp(heap, heap.length - 1, this.comp);
    return this;
  }

  /**
   * Transforms a BHeap into an array
   * @returns {Array} A BHeap instance as an array
   *
   * @example
   * heap.insert(1).insert(2);
   * heap.toArray() // will be [2, 1]
   */
  toArray() {
    return this.heap.slice(1);
  }
  /**
   * Gives the number of elements in the BHeap.
   * @returns A BHeap instance's number of elements
   *
   * @example
   * heap.size() // would be 0
   */
  size() {
    return this.heap.length - 1;
  }
}

module.exports = BHeap;
