var Structs= require("../bundle.js");
var expect= require("chai").expect;

// just testing I'm calling correct methods to mimic FIFO
describe("Queue-Behavior", function(){
  let queue, expected, cur;
  it("enqueue should extract items in FIFO ordering", function(){
    queue = new Structs.Queue();
    queue.enqueue(1).enqueue(2).enqueue(3)
    expected = [1, 2, 3];
    
    while(expected.length>0){
      let arrPop= expected.shift()
      let stackPop = queue.dequeue();
      expect(stackPop).to.be.equal(arrPop);
    }
    expect(queue.size()).to.be.equal(expected.length);
    
  });
  
  it("back does not remove back", function(){
    queue = new Structs.Queue();
    queue.enqueue(1).enqueue(2).enqueue(3)
    expected = [1, 2, 3];
    
    queue.back();
    expect(queue.size()).to.be.equal(expected.length);
    expect(queue.rep.tail.data).to.be.equal(expected[2]);
    
  });
  
});