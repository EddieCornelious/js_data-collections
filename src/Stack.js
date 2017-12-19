const List = require('./List.js');
/** LIFO stack 
 * @class 
 * @public
 **/
class Stack {
  constructor() {
    this.rep = new List();
  }
  /**
   * @param {object} data - data to push onto stack
   * @returns {object} this - the current list
   **/
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

