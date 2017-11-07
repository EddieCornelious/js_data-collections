var Structs= require("../bundle.js");
var expect= require("chai").expect;


describe("Set", function(){
  let Set1, Set2, expected, actual;
  it("constructor should initilize with array of values", function(){
    Set1 = new Structs.Set([1, 2, 3, 4, 5])
    expected = [1, 2, 3, 4, 5]
    expect(Set1.toArray()).to.deep.equal(expected)
  })
  
  it("constructor should initilize to empty array when args are undefined", function(){
    Set1 = new Structs.Set()
    expected = []
    expect(Set1.toArray()).to.deep.equal(expected)
  })
  
  it("add should add a value to set", function(){
    Set1 = new Structs.Set([1, 2, 3])
    expected = [1, 2, 3, 4]
    Set1.add(4);
    actual = Set1.toArray();
    expect(actual).to.deep.equal(expected)
    expect(actual.length).to.deep.equal(expected.length)
  })
  it("add should not add value that already exists in set", function(){
    Set1 = new Structs.Set([1, 2, 3])
    expected = [1, 2, 3]
    Set1.add(1);
    Set1.add(2);
    Set1.add(3);
    actual = Set1.toArray();
    expect(actual).to.deep.equal(expected)
    expect(actual.length).to.deep.equal(expected.length)
  })
  it("add should work with consecutive args ar argument", function(){
    Set1 = new Structs.Set()
    expected = [1, 2, 3]
    Set1.add(1, 2, 3);
    actual = Set1.toArray();
    expect(actual).to.deep.equal(expected)
    expect(actual.length).to.deep.equal(expected.length)
  })
  it("add should work with consecutive args ar argument", function(){
    Set1 = new Structs.Set()
    expected = [1, 2, 3]
    Set1.add(1, 2, 3);
    actual = Set1.toArray();
    expect(actual).to.deep.equal(expected)
    expect(actual.length).to.deep.equal(expected.length)
  })
  
  it("union should work correctly when shared values", function(){
    Set1 = new Structs.Set([1, 2, 3])
    Set2 = new Structs.Set([1, 5, 2])
    expected = [1, 2, 3, 5]
    actual = Set1.union(Set2)
    for(let i =0; i < expected.length; i++){
      const contains = actual.contains(expected[i]);
      expect(contains).to.be.equal(true);
    }
    expect(actual.size()).to.deep.equal(expected.length)
  })
  it("union should work correctly when no shared values", function(){
    Set1 = new Structs.Set([0, 2, 4])
    Set2 = new Structs.Set([1, 3, 6])
    expected = [6, 2, 0, 1, 3, 4 ]
    actual = Set1.union(Set2)
    for(let i =0; i < expected.length; i++){
      const contains = actual.contains(expected[i]);
      expect(contains).to.be.equal(true);
    }
    expect(actual.size()).to.deep.equal(expected.length)
  })
  it("union should work correctly with one empty set", function(){
    Set1 = new Structs.Set([])
    Set2 = new Structs.Set([1, 3, 6])
    expected = [6, 1, 3]
    actual = Set1.union(Set2)
    for(let i =0; i < expected.length; i++){
      const contains = actual.contains(expected[i]);
      expect(contains).to.be.equal(true);
    }
    expect(actual.size()).to.deep.equal(expected.length)
  })
  
  it("union should work correctly with two empty sets", function(){
    Set1 = new Structs.Set([])
    Set2 = new Structs.Set([])
    expected = []
    actual = Set1.union(Set2)
    for(let i = 0; i < expected.length; i++){
      const contains = actual.contains(expected[i]);
      expect(contains).to.be.equal(true);
    }
    expect(actual.size()).to.deep.equal(expected.length)
  })
  
  it("intersection should work when no shared values", function(){
    Set1 = new Structs.Set([1, 2, 3])
    Set2 = new Structs.Set([0, 4, 6])
    expected = []
    actual = Set1.intersect(Set2).toArray();
    expect(actual).to.deep.equal(expected);
    
    expect(actual.length).to.deep.equal(expected.length)
  })
  it("intersection should work when shared values", function(){
    Set1 = new Structs.Set([1, 6])
    Set2 = new Structs.Set([1, 4, 6])
    expected = [6, 1]
    actual = Set1.intersect(Set2)
    for(let i=0; i<expected.length; i++){
       expect(actual.contains(expected[i])).to.be.equal(true);
    }
    
  expect(actual.size()).to.deep.equal(expected.length)
  })
  
  it("removeAny should remove a random element from set", function(){
    Set1 = new Structs.Set([1, 6, 2])
    const beforeLen = Set1.size();
    const setBefore = Set1.toArray();
    const removed = Set1.removeAny();
    const setAfter = Set1.toArray();
    expect(setBefore.indexOf(removed)).to.not.be.equal(-1)
    expect(setAfter.length).to.be.equal(beforeLen - 1)
    expect(Set1.contains(removed)).to.be.equal(false)
  })
  
  it("difference should work properly when there is no difference", function(){
    Set1 = new Structs.Set([1, 6, 2])
    Set2 = new Structs.Set([1, 2, 6])
    expected = []
    actual = Set1.diff(Set2)
    expect(expected).to.deep.equal(actual.toArray());
    expect(actual.size()).to.deep.equal(expected.length)
  })
  
  it("difference should work properly when there is a difference", function(){
    Set1 = new Structs.Set([1, 6, 3, 5])
    Set2 = new Structs.Set([3, 5])
    expected = [6, 1]
    actual = Set1.diff(Set2)
     for(let i=0; i<expected.length; i++){
       expect(actual.contains(expected[i])).to.be.equal(true);
    }
    expect(actual.size()).to.deep.equal(expected.length)
})

it("product should work properly when there is a difference", function(){
    Set1 = new Structs.Set([1, 6, 3, 5])
    Set2 = new Structs.Set([3, 5])
    expected = [1, 3, 6, 3, 3, 3, 5, 3, 1, 5, 6, 5, 3, 5, 5, 5]
    actual = Set1.product(Set2)
    let realActual = []
     for(let i=0; i<actual.length; i++){
       realActual = realActual.concat(actual[i])
    }
    for(let i=0; i<realActual.length; i++){
       expect(realActual[i].indexOf(expected[i])).to.not.be.eqaul(-1)
    }
})


});