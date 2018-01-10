const Structs= require("../bundle.js");
const expect= require("chai").expect;


describe("List", function(){
  let list, expected, actual;

  beforeEach(function(){
    list = new Structs.List();
  });
  
  afterEach(function(){
    list, expected, actual = null;
  });
  
  it("addToFront should add data to far left of list", function(){
    list.addToFront("a")
     .addToFront("b")
     .addToFront("c");
     expected = ["c", "b", "a"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(3);
  });
  
   it("elementAtIndex should return proper element at index for existing elements", function(){
    list.addToFront("a")
     .addToFront("b")
     .addToFront("c");
     expect(list.elementAtIndex(0)).to.be.equal("c");
     expect(list.elementAtIndex(1)).to.be.equal("b");
     expect(list.elementAtIndex(2)).to.be.equal("a");
  });
  
  it("elementAtIndex should return proper element at index for non-existing indicies", function(){
     expect(list.elementAtIndex(0)).to.be.equal(undefined);
     expect(list.elementAtIndex(1)).to.be.equal(undefined);
     expect(list.elementAtIndex(2)).to.be.equal(undefined);
     expect(list.elementAtIndex(-1)).to.be.equal(undefined);
  });
  
  it("addToBack should add to far right of list", function(){
     list.addToBack("a")
       .addToBack("b")
       .addToBack("c");
       expected = ["a", "b", "c"];
       actual = list.toArray();
       expect(expected).to.have.ordered.members(actual);
       expect(list.size()).to.be.equal(3);
  });
  
   it("removeFront from empty list should return undefined", function(){
       expected = [];
       let removed = list.removeFront();
       actual = list.toArray();
       expect(expected).to.have.ordered.members(actual);
       expect(list.size()).to.be.equal(0);
       expect(removed).to.be.equal(undefined);
  });
  
   it("removeFront from list of length 1 should remove left-most element", function(){
       list.addToFront("a");
       expected = [];
       let removed = list.removeFront();
       actual = list.toArray();
       expect(expected).to.have.ordered.members(actual);
       expect(list.size()).to.be.equal(0);
       expect(removed).to.be.equal("a");
  });
  
    it("removeFront continuous example", function(){
       for(let i=0; i<100; i += 1){
         expected.push(i);
         list.addToBack(i);
       }
       
       while(list.size()>0){
         let removedList = list.removeFront();
         let removedArr = expected.shift();
         expect(removedList).to.be.equal(removedArr);
       }
       expect(expected.shift()).to.be.equal(list.removeFront());
  });
  
   it("removeBack from empty list should return undefined", function(){
       expected = [];
       let removed = list.removeBack();
       actual = list.toArray();
       expect(expected).to.have.ordered.members(actual);
       expect(list.size()).to.be.equal(0);
       expect(removed).to.be.equal(undefined);
  });
  
   it("removeBack from list of length 1 should remove right-most element", function(){
       list.addToBack("a");
       expected = [];
       let removed = list.removeBack();
       actual = list.toArray();
       expect(expected).to.have.ordered.members(actual);
       expect(list.size()).to.be.equal(0);
       expect(removed).to.be.equal("a");
  });
  
    it("removeBack continuous example", function(){
       for(let i=0; i<100; i += 1){
         expected.push(i);
         list.addToBack(i);
       }
       
       while(list.size()>0){
         let removedList = list.removeBack();
         let removedArr = expected.pop();
         expect(removedList).to.be.equal(removedArr);
       }
       expect(expected.shift()).to.be.equal(list.removeFront());
  });
  
   it("insert should insert to front of list when index is zero (empty)", function(){
     list.insert(0, "a");
     expected = ["a"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(1);
  });
  
   it("insert should insert to front of list when index is zero (non-empty)", function(){
     list.addToFront("b");
     list.insert(0, "a");
     expected = ["a", "b"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(2);
  });
  
   it("insert should insert to middle of list", function(){
     list.addToBack("b")
     .addToBack("a")
     .addToBack("c");
     list.insert(1, "hi");
     expected = ["b", "hi", "a", "c"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(4);
  });
  
  it("insert should insert to end of list when index equals length", function(){
     list.addToBack("b")
     .addToBack("a")
     .addToBack("c");
     list.insert(3, "hi");
     expected = ["b", "a", "c", "hi"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(4);
  });
  
  it("insert should insert to end of list when index equals length-1", function(){
     list.addToBack("b")
     .addToBack("a")
     .addToBack("c");
     list.insert(2, "hi");
     expected = ["b", "a", "hi", "c"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(4);
  });
  
  it("insert should insert to end of list when index > length", function(){
     list.addToBack("b")
     .addToBack("a")
     .addToBack("c");
     list.insert(4, "hi");
     expected = ["b", "a", "c", "hi"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(4);
  });
  
  it("insert should do nothing when index < 0", function(){
     list.addToBack("b")
     .addToBack("a")
     .addToBack("c");
     list.insert(-1, "hi");
     expected = ["b", "a", "c"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(3);
  });
  
  it("remove should return undefined when index is zero (empty)", function(){
     let removed = list.remove(0);
     expected = [];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(0);
     expect(removed).to.be.equal(undefined);
  });
  
   it("remove should remove front of list when index is zero (non-empty)", function(){
     list.addToFront("b");
     let removed = list.remove(0);
     expected = [];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(0);
     expect(removed).to.be.equal("b");
  });
  
   it("remove should remove from middle of list", function(){
     list.addToBack("b")
     .addToBack("a")
     .addToBack("c");
     let removed = list.remove(1);
     expected = ["b", "c"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(2);
     expect(removed).to.be.equal("a");
  });
  
  it("remove should remove from end of list when index equals length", function(){
     list.addToBack("b")
     .addToBack("a")
     .addToBack("c");
     let removed = list.remove(3);
     expected = ["b", "a"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(2);
     expect(removed).to.be.equal("c");
  });
  
  it("remove should remove from end of list when index equals length-1", function(){
     list.addToBack("b")
     .addToBack("a")
     .addToBack("c");
     let removed = list.remove(2);
     expected = ["b", "a"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(2);
     expect(removed).to.be.equal("c");
  });
  
  it("remove should remove from end of list when index > length", function(){
     list.addToBack("b")
     .addToBack("a")
     .addToBack("c");
     let removed = list.remove(4);
     expected = ["b", "a"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(2);
     expect(removed).to.be.equal("c");
  });
  
  it("remove should remove from end of list when index < 0", function(){
     list.addToBack("b")
     .addToBack("a")
     .addToBack("c");
     let removed = list.remove(-1);
     expected = ["b", "a", "c"];
     actual = list.toArray();
     expect(expected).to.have.ordered.members(actual);
     expect(list.size()).to.be.equal(3);
     expect(removed).to.be.equal(undefined);
  });

})