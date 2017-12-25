const List = require('./List.js');
class Stack {
  constructor() {
    this.rep = new List();
  }
  push(data) {
    this.rep.addToFront(data);
    return this;
  }

  pop() {
    return this.rep.removeFront();
  }

  peek() {
    return this.rep.elementAtIndex(0);
  }

  size() {
    return this.rep.size();
  }
}

module.exports = Stack;

