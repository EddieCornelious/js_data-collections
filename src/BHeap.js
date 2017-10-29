function maxHeapify(A, index, comp) {
  let left = (2 * index);
  let right = (2 * index) + 1;
  let largest;

  if (left <= A.length - 1 && comp(A[left], A[index]) === 1) {
    largest = left;
  } else {
    largest = index;
  }

  if (right <= A.length - 1 && comp(A[right], A[largest]) === 1) {
    largest = right;
  }

  if (comp(largest, index) !== 0) {
    let oldIndex = A[index];
    A[index] = A[largest];
    A[largest] = oldIndex;
    maxHeapify(A, largest, comp);
  }
}

function siftUp(A, index, comp) {
  if (index >= 2) {
    let parent = Math.floor(index / 2);
    if (comp(A[parent], A[index]) === -1) {
      let oldParent = A[parent];
      A[parent] = A[index];
      A[index] = oldParent;

      siftUp(A, parent, comp);
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

class BHeap {
  constructor(comparator) {
    this.heap = [null];
    this.comp = comparator || defaultEqual;
  }

  extractRoot() {
    const heap = this.heap;
    let max = heap[1];
    heap[1] = heap[heap.length - 1];
    heap.length -= 1;
    maxHeapify(heap, 1, this.comp);
    return max;
  }

  insert(data) {
    const heap = this.heap;
    heap[heap.length] = data;
    siftUp(heap, heap.length - 1, this.comp);
  }

  size() {
    return this.heap.length - 1;
  }
}

module.exports = BHeap;
