const Collections = require("../collections.js");
const expect = require("chai").expect;

describe("Stack-Behavior", function() {
  let stack, expected, actual;

  it("push should extract items in LIFO ordering", function() {
    stack = new Collections.Stack();
    stack
      .push(1)
      .push(2)
      .push(3);
    expected = [3, 2, 1];

    while (expected.length > 0) {
      let arrPop = expected.shift();
      actual = stack.pop();
      expect(actual).to.be.equal(arrPop);
    }
  });
});
