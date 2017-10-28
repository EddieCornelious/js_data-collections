var Structs= require("../bundle.js");
var expect= require("chai").expect;

// just testing I'm calling correct methods to mimic LIFO
describe("Stack-Behavior", function(){
  let stack, expected, cur;
  it("push should extract items in LIFO ordering", function(){
    stack = new Structs.Stack();
    stack.push(1).push(2).push(3)
    expected = [3, 2, 1];
    
    while(expected.length>0){
      let arrPop= expected.shift()
      let stackPop = stack.pop();
      expect(stackPop).to.be.equal(arrPop);
    }
    
    
  });
  
  it("pop from empty stack should fail silently ", function(){
    stack = new Structs.Stack();
    stack.pop();
    
  });
  
  it("peek should not remove top of stack ", function(){
    stack = new Structs.Stack();
    stack.push(0)
    stack.peek();
    expect(stack.size()).to.be.equal(1)
    expect(stack.rep.head.data).to.be.equal(0)
  });
  
});