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
  

})