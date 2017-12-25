const Structs = require("../bundle.js");
const expect = require("chai").expect;

describe("Heap", function() {
  let heap, expected, actual;
  beforeEach(function() {
    heap = new Structs.BHeap();
  });
  afterEach( function() {
    heap,
    expected,
    actual = null;
  });
  it("insert should siftup from bottom to root", function() {
    heap.insert(10)
    .insert(9)
    .insert(8)
    .insert(11);
    expected = [11, 10, 8, 9];
    actual = heap.toArray();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(4);
  });
  it("insert should not siftUp when un needed", function() {
    heap.insert(10);
    heap.insert(9);
    heap.insert(8);
    heap.insert(1);
    expected = [10, 9, 8, 1];
    actual = heap.toArray();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(4);
  });
  it("insert should insert duplicate values", function() {
    heap.insert(10);
    heap.insert(9);
    heap.insert(8);
    expected = [10, 10, 8, 9];
    heap.insert(10);
    actual = heap.toArray();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(4);
  });
  it("insert should update max correctly for multiple max changing calls", function() {
    heap.insert(1);
    heap.insert(2);
    heap.insert(3);
    expected = [5, 4, 2, 1, 3];
    heap.insert(4);
    heap.insert(5);
    actual = heap.toArray();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(5);
  });
  it("extractRoot should update heap properly after deletion", function() {
    heap.insert(1);
    heap.insert(2);
    heap.insert(3);
    heap.insert(4);
    expected = [3, 1, 2];
    let extracted = heap.extractRoot();
    actual = heap.toArray();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(heap.size()).to.be.equal(3);
    expect(extracted).to.be.equal(4);
  });
  it("extractRoot from empty heap should return undefined", function() {
    let extracted = heap.extractRoot();
    heap.extractRoot();
    heap.extractRoot();
    //ensure inner workings are fine
    actual = heap.heap;
    expect(heap.size()).to.be.equal(0);
    expect(extracted).to.be.equal(undefined);
    expect(actual).to.be.deep.equal([null]);
    actual = heap.toArray();
    expect(actual).to.be.deep.equal([]);
  });
  it("extractRoot with continuous example", function() {
    heap.insert(1);
    heap.insert(2);
    heap.insert(3);
    heap.insert(4);
    heap.insert(5);
    expected = [5, 4, 3, 2, 1];
    let i = 0;
    while(heap.size()){
      let val = heap.extractRoot();
      expect(expected[i]).to.be.equal(val);
      i += 1;
    }
    expect(heap.size()).to.be.equal(0);
  });
  it("min heap works", function() {
    let minHeap = new Structs.BHeap(function(a, b) {
      if (a < b) {
        return 1;
      } else if (a === b) {
        return 0;
      }
      return -1;
    });
    minHeap.insert(5);
    minHeap.insert(4);
    minHeap.insert(3);
    minHeap.insert(2);
    minHeap.insert(1);
    actual = minHeap.toArray();
    expected = [1, 2, 4, 5, 3];
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(minHeap.size()).to.be.equal(5);
  });
});