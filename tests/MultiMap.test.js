import MultiMap from '../src/MultiMap.js';
const expect = require('chai').expect;

describe('MultiMap', function() {
  let map, expected, actual;

  beforeEach(function() {
    map = new MultiMap();
  });

  afterEach(function() {
    map, expected, (actual = null);
  });

  it("replaceVal should replace an old value with the new one", function(){
    map.put(1, [2, 3]);
    map.replaceVal(1, 2, "pizza");
    expected = ["pizza", 3];
    actual = map.getVal(1);
    expect(actual).to.have.members(expected);
    
  });
  
  it("containsEntry should return true if k, v pair exists in map", function(){
    map.put(1, [2, 3]);
    expected = true;
    actual = map.containsEntry(1, 3);
    expect(actual).to.be.equal(expected);
    
  });
  
  it("removeVal removes existing values from map", function(){
    map.put(1, [2, 3]);
    expected = [2];
    actual = map.removeVal(1, 2);
    expect(actual).to.have.members(expected);
    expect(map.getVal(1)).to.have.members([3]);
    
  });
  
   it("put inserts one key mapped to multiple values", function(){
    map.put(1, 2);
    map.put(1, 5);
    expected = [2, 5];
    actual = map.getVal(1);
    expect(actual).to.have.members(expected);
  });
  
  it("put inserts one key mapped to multiple values when given array for inital insert", function(){
    map.put(1, [4, 5]);
    expected = [4, 5];
    actual = map.getVal(1, 2);
    expect(actual).to.have.members(expected);
  });
});