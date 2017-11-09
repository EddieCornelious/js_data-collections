var Structs= require("../bundle.js");
var expect= require("chai").expect;


describe("HashMap", function(){
  let map, expected, cur;
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
  
  it("put should rehash inner table when .75 full", function(){
      map = new Structs.HashMap();
      for(let i =0; i<18; i++){
          map.put(i, i);
      }
      expect(map.tableSize()).to.be.equal(43)
      for(let i=18; i<55; i++){
          map.put(i, i);
      }
      expect(map.tableSize()).to.be.equal(83)
  });
});