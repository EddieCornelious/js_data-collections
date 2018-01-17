const Collections = require("../collections.js");
var expect = require("chai").expect;


describe("HashSet", function() {
  let Set, Set2, expected;

  beforeEach(function() {
    Set = new Collections.HashSet();
    Set2 = new Collections.HashSet();
  });

  afterEach(function() {
    expected,
    Set,
    Set2 = null;
  });

  it("add should add element to set", function() {
    Set.add("a");
    Set.add("b");
    Set.add("c");
    expect(Set.has("a")).to.be.equal(true);
    expect(Set.has("b")).to.be.equal(true);
    expect(Set.has("c")).to.be.equal(true);
    expect(Set.cardinality()).to.be.equal(3);
  });

  it("intersect should update 'this' set to contain intersection of the two sets", function() {
    Set.add("a");
    Set.add("b");
    Set.add("c");
    Set2.add("b");
    Set2.add("c");
    Set.intersect(Set2);
    expect(Set.has("a")).to.be.equal(false);
    expect(Set.has("b")).to.be.equal(true);
    expect(Set.has("c")).to.be.equal(true);
  });

  it("intersect should not update 'this' set when two sets have no intersection", function() {
    Set.add("a");
    Set.add("b");
    Set.add("c");
    Set2.add("e");
    Set2.add("f");
    Set2.add("g");
    Set2.add("r");
    Set.intersect(Set2);
    expect(Set.has("a")).to.be.equal(false);
    expect(Set.has("b")).to.be.equal(false);
    expect(Set.has("c")).to.be.equal(false);
    expect(Set.cardinality()).to.be.equal(0);
    expect(Set2.cardinality()).to.be.equal(4);
  });

  it("intersect should update 'this' set with intersection when other set is empty", function() {
    Set.add("a");
    Set.intersect(Set2);
    expect(Set.cardinality()).to.be.equal(0);
    expect(Set2.cardinality()).to.be.equal(0);
  });


  it("intersect should update 'this' set with intersection when 'this' is empty", function() {
    Set2.add("b");
    Set.intersect(Set2);
    expect(Set.cardinality()).to.be.equal(0);
    expect(Set2.cardinality()).to.be.equal(1);
  });

  it("intersect should update 'this' set with intersection when both are empty", function() {
    Set.intersect(Set2);
    expect(Set.cardinality()).to.be.equal(0);
    expect(Set2.cardinality()).to.be.equal(0);
  });

  it("diff should update 'this' set with difference when no difference", function() {
    Set.add("a");
    Set.add("b");
    Set.add("c");
    Set2.add("d");
    Set2.add("e");
    Set2.add("f");
    Set.diff(Set2);
    expect(Set.has("a")).to.be.equal(true);
    expect(Set.has("b")).to.be.equal(true);
    expect(Set.has("c")).to.be.equal(true);
    expect(Set.cardinality()).to.be.equal(3);
    expect(Set2.cardinality()).to.be.equal(3);
  });

  it("diff should update 'this' set with difference when difference", function() {
    Set.add("a");
    Set.add("b");
    Set.add("c");
    Set2.add("c");
    Set.diff(Set2);
    expect(Set.has("a")).to.be.equal(true);
    expect(Set.has("b")).to.be.equal(true);
    expect(Set.has("c")).to.be.equal(false);
    expect(Set.cardinality()).to.be.equal(2);
    expect(Set2.cardinality()).to.be.equal(1);
  });

  it("diff should update this with difference when 'this' set is empty", function() {
    Set2.add("f");
    Set.diff(Set2);
    Set.intersect(Set2);
    expect(Set.cardinality()).to.be.equal(0);
    expect(Set2.cardinality()).to.be.equal(1);
  });

  it("diff should update 'this' set with difference when other set is empty", function() {
    Set.add("a");
    Set.add("b");
    Set.add("c");
    Set.diff(Set2);
    expect(Set.cardinality()).to.be.equal(3);
    expect(Set2.cardinality()).to.be.equal(0);
  });

  it("diff should update 'this' set with difference when both are empty", function() {
    Set.diff(Set2);
    expect(Set.cardinality()).to.be.equal(0);
    expect(Set2.cardinality()).to.be.equal(0);
  });
});