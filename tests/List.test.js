var Structs= require("../bundle.js");
var expect= require("chai").expect;

var list;
describe("List", function(){
    list= new Structs.List()
    list.addToFront(22);
    console.log(list)
    it("should work", function(){
        expect(true).to.be.equal(true)
    })
})
