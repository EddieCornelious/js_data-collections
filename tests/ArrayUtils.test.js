const Structs = require("../bundle.js");
const expect = require("chai").expect;

describe("ArrayUtils", function() {
  let ArrayUtils = Structs.ArrayUtils;
  let expected, actual;
  beforeEach( function() {
    expected = [];
    actual = [];
  });
  afterEach( function() {
    expected,
    actual = null;
  });
  it("remove should remove from first index of array", function(){
    actual.push(1, 2, 3, 4, 5, 6);
    ArrayUtils.remove(actual, 0);
    expected = [2, 3, 4, 5, 6];
    expect(actual).to.have.ordered.members(expected);
  });
  it("remove should remove from last index of array", function(){
    actual.push(1, 2, 3, 4, 5, 6);
    ArrayUtils.remove(actual, 5);
    expected = [1, 2, 3, 4, 5];
    expect(actual).to.have.ordered.members(expected);
  });
  it("remove should remove from middle index of array", function(){
    actual.push(1, 2, 3, 4, 5, 6);
    ArrayUtils.remove(actual, 3);
    expected = [1, 2, 3, 5, 6];
    expect(actual).to.have.ordered.members(expected);
  });
  it("remove should do nothing with empty array", function(){
    ArrayUtils.remove(actual, 3);
    expected = [];
    expect(actual).to.have.ordered.members(expected);
  });
  it("remove should work properly with array of length 1", function(){
    actual.push("A");
    ArrayUtils.remove(actual, 0);
    expected = [];
    expect(actual).to.have.ordered.members(expected);
  });
  it("remove should not alter array when index equals array length", function(){
    actual.push("A");
    ArrayUtils.remove(actual, 1);
    expected = ["A"];
    expect(actual).to.have.ordered.members(expected);
  });
  it("remove should not alter array when index > array length", function(){
    actual.push("A");
    ArrayUtils.remove(actual, 2);
    expected = ["A"];
    expect(actual).to.have.ordered.members(expected);
  });
  it("remove should not remove anything when index < 0", function(){
    actual.push("A");
    ArrayUtils.remove(actual, -1);
    expected = ["A"];
    expect(actual).to.have.ordered.members(expected);
  });
  it("removeObj should work properly if object is in array", function(){
    actual.push("A");
    ArrayUtils.removeObj(actual, "A");
    expected = [];
    expect(actual).to.have.ordered.members(expected);
  });
  it("removeObj should not alter array if object is not in array", function(){
    actual.push("A", "B");
    ArrayUtils.removeObj(actual, "C");
    expected = ["A", "B"];
    expect(actual).to.have.ordered.members(expected);
  });
  it("rotate should not work for OBVIOUS non numbers", function(){
    actual.push("A", "B");
    expect(() => ArrayUtils.rotate(actual, "a")).to.throw(TypeError);
    expect(() => ArrayUtils.rotate(actual, {})).to.throw(TypeError);
    expect(() => ArrayUtils.rotate(actual, [1, 2])).to.throw(TypeError);
    expected = ["A", "B"];
    expect(actual).to.have.ordered.members(expected);
  });
   it("rotate should work for negative numbers", function(){
    actual.push("A", "B", "C", "D");
    expected = ["B", "C", "D", "A"];
    ArrayUtils.rotate(actual, -1);
    expect(actual).to.have.ordered.members(expected);
  });
});