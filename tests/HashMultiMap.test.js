const Structs = require("../bundle.js");
const expect = require("chai").expect;

describe("HashMultiMap", function() {
  let map, expected, actual;

  beforeEach(function() {
    map = new Structs.HashMultiMap();
  });

  afterEach( function() {
    map,
    expected,
    actual = null;
  });
  
  it("put should map one key to multiple values" , function() {
    map.put("ed", "jones");
    map.put("ed", "james");
    map.put("ed", "kane");
    map.put("james", "jones");
    expected = ["jones", "james", "kane"];
    expect(map.getVal("ed")).to.have.ordered.members(expected);
    expect(map.size()).to.be.equal(2);
  });
  
  it("put should not insert duplicate values" , function() {
    map.put("ed", "jones");
    map.put("ed", "james");
    map.put("ed", "kane");
    map.put("ed", "kane");
    map.put("ed", "james");
    expected = ["jones", "james", "kane"];
    actual = map.getVal("ed");
    expect(actual).to.have.ordered.members(expected);
    expect(actual.length).to.be.equal(3);
    expect(map.size()).to.be.equal(1);
  });

  it("remove removes key and all values" , function() {
    map.put("ed", "jones");
    map.put("ed", "james");
    map.put("ed", "kane");
    map.put("ed", "kane");
    map.put("ed", "james");
    expected = [];
    map.remove("ed");
    actual = map.getVal("ed");
    expect(actual).to.be.equal(undefined);
    expect(map.size()).to.be.equal(0);
  });
 
});