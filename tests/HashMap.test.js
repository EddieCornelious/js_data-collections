var Structs= require("../bundle.js");
var expect= require("chai").expect;


describe("HashMap", function(){
  let map, expected, cur;
  // More tests later
  it("get should work correctly throught multiple rehashes", function(){
      map = new Structs.HashMap();
      expected = [23, 43, 83, 163]
      for(let i =0; i<100; i++){
          
          map.put(i, i);
      }
      
      for(let i =0; i<100; i++){
         expect(map.getVal(i)).to.be.equal(i);
         //check table resizes and doubles with length of nearest prime <= to 2*oldSize
      }
  })
  
  it("put should rehash inner table when .75 full", function(){
      map = new Structs.HashMap(20);
      for(let i =0; i<15; i++){
          map.put(i, i);
      }
      expect(map._table.length).to.be.equal(37)
      for(let i=15; i<35; i++){
          map.put(i, i);
      }
      expect(map._table.length).to.be.equal(73)
      
  })
});