const Collections = require("../collections.js");
var expect = require("chai").expect;


describe("Set", function() {
  let Set, Set2, expected;

  beforeEach(function() {
    Set = new Collections.Set();
    Set2 = new Collections.Set();
  });

  afterEach(function() {
    expected,
    Set,
    Set2 = null;
  });

  it("intersect works correctly", function() {
    Set.add(2);
    Set.add(1);
    Set2.add(2);
    Set.intersect(Set2);
    expect(Set.keys()).to.have.members([2]);
  });
});