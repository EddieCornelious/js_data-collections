const Collections = require("../collections.js");
const expect= require("chai").expect;


describe("PriorityQueue", function(){
  let pq, expected;

  beforeEach( function() {
    pq = new Collections.PriorityQueue();
  });

  afterEach( function() {
    pq,
    expected;
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