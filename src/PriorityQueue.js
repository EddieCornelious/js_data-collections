const BHeap = require('./BHeap.js');

function min(a, b) {
  if (a.p < b.p) {
    return 1;
  } else if (a.p === b.p) {
    return 0;
  }
  return -1;
}

class PriorityQueue {
  constructor() {
    this.rep = new BHeap(min);
  }

  enqueue(data, priority) {
    this.rep.insert({ data, p: priority });
  }
}

module.exports = PriorityQueue;
