var Structs= require("../bundle.js");
var expect= require("chai").expect;


describe("PriorityQueue", function(){
  let pq, expected, cur;
  // TODO :tests
  it("insert should siftup from bottom to root", function(){
    pq = new Structs.PriorityQueue();
    pq.enqueue("dog", 1)
    pq.enqueue("cat", 2)
    pq.enqueue("pot", 3)
    console.log(pq.rep)
  })
  
});