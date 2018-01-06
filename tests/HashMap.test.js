var Structs = require("../bundle.js");
var expect = require("chai").expect;


describe("HashMap", function() {
  let map, expected, actual;

  beforeEach(function() {
    map = new Structs.HashMap();
  });

  beforeEach(function() {
    expected,
    map,
    actual = null;
  });

  it("put inserts data into map correctly", function() {
    map.put("a", "A");
    map.put("b", "B");
    map.put("c", "C");
    expect(map.contains("a")).to.be.equal(true);
    expect(map.contains("b")).to.be.equal(true);
    expect(map.contains("c")).to.be.equal(true);
    expect(map.size()).to.be.equal(3);
  });

  it("put updates value if key already exists", function() {
    map.put("a", "A");
    map.put("b", "B");
    map.put("c", "C");
    map.put("b", "I like golf");
    expect(map.contains("a")).to.be.equal(true);
    expect(map.getVal("b")).to.be.equal("I like golf");
    expect(map.contains("c")).to.be.equal(true);
    expect(map.size()).to.be.equal(3);
  });

  it("getVal should work correctly throught multiple rehashes", function() {
    for (let i = 0; i < 100; i += 1) {
      map.put(i, i * 2);
    }
    for (let i = 0; i < 100; i += 1) {
      expect(map.getVal(i)).to.be.equal(i * 2);
    }
  });

  it("getVal should work correctly through multiple rehashes of ref types for values", function() {
    for (let i = 0; i < 1000; i += 1) {
      map.put(i, {
        data: i * 2
      });
    }
    for (let i = 0; i < 1000; i += 1) {
      expect(map.getVal(i).data).to.be.equal(i * 2);
    }
    expect(map.size()).to.be.equal(1000);
  });

  it("put should rehash inner table when .75 full", function() {
    for (let i = 0; i < 18; i += 1) {
      map.put(i, i);
    }
    expect(map.tableSize()).to.be.equal(26);
    for (let i = 18; i < 35; i += 1) {
      map.put(i, i);
    }
    expect(map.tableSize()).to.be.equal(52);
  });

  it("remove should remove key", function() {
    map.put("a", "Pizza");
    const before = map.contains("a");
    expect(map.remove("a")).to.be.equal(true);
    const after = map.contains("a");
    expect(before).to.be.equal(true);
    expect(after).to.be.equal(false);
  });

  it("remove should return false if key was not removed from map", function() {
    expect(map.remove("a")).to.be.equal(false);
  });

  it("keys should return all keys in map", function() {
    map.put(0, "c");
    map.put(1, "doe");
    map.put("dog", "doe");
    map.put("apple", "doe");
    expected = ["dog", 0, 1, "apple"];
    actual = map.keys();
    for (let i = 0; i < expected.length; i += 1) {
      expect(actual.indexOf(expected[i])).to.not.be.equal(-1);
    }
    expect(expected.length).to.be.equal(actual.length);
  });

  it("size should update properly after insert", function() {
    map.put(0, "c");
    map.put(1, "doe");
    map.put("dog", "doe");
    map.put("apple", "doe");

    expect(map.size()).to.be.equal(4);
    map.remove("apple");
    expect(map.size()).to.be.equal(3);
  });
});