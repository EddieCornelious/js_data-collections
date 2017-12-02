var Structs= require("../bundle.js");
var expect= require("chai").expect;


describe("Heap", function(){
  let heap, expected, actual;
  beforeEach(function(){
    heap = new Structs.BHeap();
  })
  afterEach(function(){
    heap, expected, actual = null;
  })
  
  it("insert should siftup from bottom to root", function(){
    
    heap.insert(10)
    heap.insert(9)
    heap.insert(8)
    expected = [null, 11, 10, 8, 9]
    heap.insert(11)
    actual = heap.heap;
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(4);
  })
  
  it("insert should not siftUp when un needed", function(){
    heap = new Structs.BHeap()
    heap.insert(10)
    heap.insert(9)
    heap.insert(8)
    expected = [null, 10, 9, 8, 1]
    heap.insert(1)
    actual = heap.heap;
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(4);
  })
  
  it("insert should insert duplicate values", function(){
   
    heap.insert(10)
    heap.insert(9)
    heap.insert(8)
    expected = [null, 10, 10, 8, 9]
    heap.insert(10)
    actual = heap.heap;
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(4);
  })
  
   it("insert should update max correctly for multiple max changing calls", function(){
   
    heap.insert(1)
    heap.insert(2)
    heap.insert(3)
    expected = [null, 5, 4, 2, 1, 3]
    heap.insert(4)
    heap.insert(5)
    actual = heap.heap;
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(5);
  })
  it("extract should update heap properly after deletion", function(){
    heap = new Structs.BHeap()
    heap.insert(1)
    heap.insert(2)
    heap.insert(3)
    heap.insert(4)
    expected = [null, 3, 1, 2]
    heap.extractRoot();
    actual = heap.heap;
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(3);
  })
  
  it("extract from empty heap should retain null root", function(){
   
    heap.insert(1)
    heap.insert(2)
    expected = [null]
    heap.extractRoot();
    heap.extractRoot();
    heap.extractRoot();
    heap.extractRoot();
    heap.extractRoot();
    actual = heap.heap;
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(0);
    
  })
  
it("extract from heap continuous example", function(){
    
    heap.insert(1)
    heap.insert(2)
    heap.insert(3)
    heap.insert(4)
    heap.insert(5)
    
    expected = [null, 5, 4, 3, 2, 1]
    for(let i=1; i<expected.length; i++){
      let val = heap.extractRoot();
      console.log(heap.heap)
      expect(expected[i]).to.be.equal(val);
    }
    expect(heap.size()).to.be.equal(0);
    
  })
  
  it("min heap works", function(){
    heap = new Structs.BHeap(function(a, b){
      if(a<b){
        return 1
      }
      else if(a === b){
        return 0
      }
      return -1
    })
    heap.insert(5)
    heap.insert(4)
    heap.insert(3)
    heap.insert(2)
    heap.insert(1)
    actual = heap.heap;
    expected = [null, 1, 2, 4, 5, 3]
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(5);
    
  })
  
});