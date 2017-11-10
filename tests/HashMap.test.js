var Structs= require("../bundle.js");
var expect= require("chai").expect;


describe("HashMap", function(){
  let map, expected, actual;
  // More tests later
  it("get should work correctly throught multiple rehashes", function(){
      map = new Structs.HashMap();
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
      map = new Structs.HashMap();
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
  
  it("put should rehash inner table when .75 full", function(){
      map = new Structs.HashMap();
      for(let i =0; i<18; i++){
          map.put(i, i);
      }
      console.log(map.insert)
      expect(map.tableSize()).to.be.equal(43)
      for(let i=18; i<55; i++){
          map.put(i, i);
      }
      expect(map.tableSize()).to.be.equal(83)
  });
  
  it("remove key should remove key", function(){
      map = new Structs.HashMap();
      map.put(0, "c")
      map.put(1, "doe")
      map.put(3, "doe")
      //above known to hash to same bucket
      map.remove(1)
      expect(map.contains(1)).to.be.equal(false)
      expect(map.contains(0)).to.be.equal(true)
      expect(map.contains(3)).to.be.equal(true)
      expect(map.size()).to.be.equal(2)
      
  })
  
   it("getKeys should return all keys in map", function(){
      map = new Structs.HashMap();
      map.put(0, "c")
      map.put(1, "doe")
      map.put("dog", "doe")
      map.put("apple", "doe")
      expected = ["dog", 0, 1, "apple"]
      actual = map.getKeys()
      for(let i=0; i< expected.length; i++){
         expect(actual.indexOf(expected[i])).to.not.be.equal(-1);
      }
      expect(expected.length).to.be.equal(actual.length)
  })
});