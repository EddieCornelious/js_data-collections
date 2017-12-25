function swap(array, index1, index2) {
  const oldIndex1 = array[index1];
  array[index1] = array[index2];
  array[index2] = oldIndex1;
}
/**
 * @private
 * @param {Array} array - Array to make a max/min heap
 * @param {index} index - Index to start sifting down from
 * @param {function(Object, Object)} comp - comparator function to compare indicies
 * @returns {undefined} 
 **/
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
 * @param {Array} array - Array to make a max/min heap
 * @param {index} index - Index to start sifting up from
 * @param {function} comp - function to compare indicies
 * @returns {undefined}
 **/
function siftUp(array, index, comp) {
  if (index > 1) {
    const parent = Math.floor(index / 2);
    if (comp(array[parent], array[index]) === -1) {
      swap(array, parent, index);
      siftUp(array, parent, comp);
    }
  }
}

function defaultEqual(a, b) {
  if (a < b) {
    return -1;
  } else if (a === b) {
    return 0;
  }
  return 1;
}
/**Binary Heap representation (default comparator gives max heap)
 * @class
 * @public
 * @param {function} comparator - function to compare indicies
 **/
class BHeap {
  constructor(comparator) {
    this.heap = [null];
    this.comp = comparator || defaultEqual;
  }
  /**Extracts the root of the heap and returns it
   * @public
   * @returns {*}  The data removed from the heap's root
   * @example
   * const heap = new Structs.BHeap()
   * heap.insert(1); heap.insert(2);
   * //2
   * ///\
   * //1
   * heap.extractRoot()
   * // extracts 2
   **/
  extractRoot() {
    const heap = this.heap;
    let max = heap[1];
    heap[1] = heap[heap.length - 1];
    heap.length -= 1;
    heapify(heap, 1, this.comp);
    return max;
  }
  /**Inserts given data into heap
   * @public
   * @param {*} data - the data to insert into heap
   * @returns {this} 'this' heap
   **/
  insert(data) {
    const heap = this.heap;
    heap[heap.length] = data;
    siftUp(heap, heap.length - 1, this.comp);
    return this;
  }
  /**Converts 'this' heap into an Array
   * @public
   * @returns {Array} 'this' heap to an Array
   **/
  toArray(){
    return this.heap.slice(1);
  }
  /**
   * Returns the number of elements in 'this' heap
   * @public
   * @returns {number} the size of 'this' heap
   **/
  size() {
    return this.heap.length - 1;
  }
}

module.exports = BHeap;