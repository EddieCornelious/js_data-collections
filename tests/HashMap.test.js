var Structs= require("../bundle.js");
var expect= require("chai").expect;


describe("HashMap", function(){
  let map, expected, actual;
  // More tests later
  beforeEach(function(){
      map = new Structs.HashMap();
   })
   beforeEach(function(){
      expected, map, actual = null;
   })
   
  it("get should work correctly throught multiple rehashes", function(){
      expected = [23, 43, 83, 163]
      for(let i =0; i<100; i++){
          
          map.put(i, i*2);
      }
      
      for(let i =0; i<100; i++){
         expect(map.getVal(i)).to.be.equal(i*2);
         //check table resizes and doubles with length of nearest prime <= to 2*oldSize
      }
  })
  
  it("get should work correctly throught multiple rehashes ref types", function(){
     
      expected = [23, 43, 83, 163]
      const a = {data: function(){return "A"}}
      const b = {data: function(){return "B"}}
      map.put(a, function(){return "gotA"})
      map.put(b, function(){return "gotB"})
      for(let i =0; i<100; i++){
          map.put(i, i*2);
      }
      for(let i =0; i<100; i++){
         expect(map.getVal(i)).to.be.equal(i*2);
         //check table resizes and doubles with length of nearest prime <= to 2*oldSize
      }
      expect(map.getVal(a)()).to.be.equal("gotA")
      expect(map.getVal(b)()).to.be.equal("gotB")
  })
  
  it("put should not update already occuring key value", function(){
      map.put("a", "A")
      map.put("a", "B")
      map.put("a", "C")
      expect(map.getVal("a")).to.be.equal("A")
  });
  
  it("put should rehash inner table when .70 full", function(){
      
      for(let i =0; i<18; i++){
          map.put(i, i);
      }
      expect(map.tableSize()).to.be.equal(26)
      for(let i=18; i<35; i++){
          map.put(i, i);
      }
      expect(map.tableSize()).to.be.equal(52)
  });
  
   it("remove should remove key", function(){
      map.put("a", "Pizza")
      const before = map.contains("a")
      map.remove("a")
      const after = map.contains("a")
      expect(before).to.be.equal(true)
      expect(after).to.be.equal(false)
  });
  
  
   it("remove should silently fail if key is not in map", function(){
      map.remove("a")
  });
  
   it("update should update key", function(){
      map.put("a", "Pizza")
      map.update("a", "burgers")
      expect(map.getVal("a")).to.be.equal("burgers")
  });
  
  it("update should not update or insert key not in map", function(){
      map.update("a", "burgers")
      expect(map.getVal("a")).to.be.equal(undefined)
      
  });
  
   it("getKeys should return all keys in map", function(){
    
      map.put(0, "c")
      map.put(1, "doe")
      map.put("dog", "doe")
      map.put("apple", "doe")
      expected = ["dog", 0, 1, "apple"]
      actual = map.keys()
      for(let i=0; i< expected.length; i++){
         expect(actual.indexOf(expected[i])).to.not.be.equal(-1);
      }
      expect(expected.length).to.be.equal(actual.length)
  })
  
  it("size should update properly", function(){
    
      map.put(0, "c")
      map.put(1, "doe")
      map.put("dog", "doe")
      map.put("apple", "doe")
      
      expect(map.size()).to.be.equal(4)
      map.remove("apple")
      expect(map.size()).to.be.equal(3)
  })
});