const List = require('./List.js');

class Queue {
  constructor() {
    this.rep = new List();
  }

  enqueue(data) {
    this.rep.addToBack(data);
    return this;
  }

  dequeue() {
    const oldVal = this.rep.elementAtIndex(0);
    this.rep.removeFront();
    return oldVal;
  }
  // TODO: Create a list method that reports tail which is 0(1) or keep this?
  back() {
    const back = this.rep.tail;
    return back ? back.data : undefined;
  }

  front() {
    return this.rep.elementAtIndex(0);
  }

  size() {
    return this.rep.size();
  }
}

module.exports = Queue;
