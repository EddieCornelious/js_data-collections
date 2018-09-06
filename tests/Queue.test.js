import Queue from '../src/Queue.js';
const expect = require('chai').expect;

describe('Queue-Behavior', function() {
  let queue, expected, actual;
  it('enqueue should extract items in FIFO ordering', function() {
    queue = new Queue();
    queue
      .enqueue(1)
      .enqueue(2)
      .enqueue(3);
    expected = [1, 2, 3];

    while (expected.length > 0) {
      let arrPop = expected.shift();
      actual = queue.dequeue();
      expect(actual).to.be.equal(arrPop);
    }
    expect(queue.size()).to.be.equal(expected.length);
  });
});
