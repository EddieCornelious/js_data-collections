var Structs= require("../bundle.js");
var expect= require("chai").expect;

var list;
describe("List", function(){
    list= new Structs.List()
    console.log(list)
    it("should work", function(){
        expect(list._dummy).to.be.equal(21)
    })
})
