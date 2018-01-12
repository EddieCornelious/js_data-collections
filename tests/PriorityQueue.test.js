const Structs= require("../bundle.js");
const expect= require("chai").expect;


describe("PriorityQueue", function(){
  let pq, expected, actual;

  beforeEach( function() {
    pq = new Structs.PriorityQueue();
  });

  afterEach( function() {
    pq,
    expected,
    actual = null;
  });

  it("Priority queue behaces like a priority queue", function(){
    pq.enqueue("wake up", 1);
    pq.enqueue("eat breakfast", 2);
    pq.enqueue("brush teeth", 3);
    pq.enqueue("wash face", 4);
    pq.enqueue("write code", 6);
    expected = ["wake up","eat breakfast","brush teeth","wash face","write code" ];
    
    while(pq.size() > 0) {
      let actual = pq.dequeue();
      expect(actual).to.be.equal(expected.shift());
    }
  });
  
});