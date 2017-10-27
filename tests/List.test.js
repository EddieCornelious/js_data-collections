var Structs= require("../bundle.js");
var expect= require("chai").expect;

var list;

describe("List", function(){
  let list, expected, cur;
  
  it("constructor initializes private props correctly", function(){
    list= new Structs.List()
    
    expect(list.head).to.be.equal(null)
    expect(list.tail).to.be.equal(null)
    expect(list.length).to.be.equal(0) 
  })
  
  it("addToFront should add to the front of empty list", function(){
    list= new Structs.List()
    list.addToFront("a")
    expect(list.head.data).to.be.equal("a")
    expect(list.head.prev).to.be.equal(null)
    expect(list.head.next).to.be.equal(null)
    expect(list.tail.data).to.be.equal("a")
    expect(list.length).to.be.equal(1) 
  })
  
  it("addToFront should add to the front of non-empty list", function(){
    list= new Structs.List()
    list.addToFront("a")
    .addToFront("b")
    expected= [null, "b", "a", null]
    cur= list.head;
    expect(expected[0]).to.be.equal(cur.prev);
    for(let i=1; i<expected.length-1; i++){
      if(i>1){
        expect(expected[i-1]).to.be.equal(cur.prev.data);
      }
      expect(expected[i]).to.be.equal(cur.data);
      cur= cur.next;
    }
    expect(expected[expected.length-1]).to.be.equal(cur)
    expect(list.tail.data).to.be.equal(expected[2])
    expect(list.length).to.be.equal(2)
  })
  
  it("addToBack should add to the back of non-empty list", function(){
    list= new Structs.List()
    list.addToBack("a")
    .addToBack("b")
    
    expected= [null, "a", "b", null]
    cur= list.head;
    expect(expected[0]).to.be.equal(cur.prev);
    for(let i=1; i<expected.length-1; i++){
      if(i>1){
        expect(expected[i-1]).to.be.equal(cur.prev.data);
      }
      expect(expected[i]).to.be.equal(cur.data);
      cur= cur.next;
    }
    expect(expected[expected.length-1]).to.be.equal(cur)
    expect(list.tail.data).to.be.equal(expected[2])
    expect(list.length).to.be.equal(2)
  })
  
  it("addToBack should add to the back of empty list", function(){
    list= new Structs.List()
    list.addToFront("a")
    expect(list.head.data).to.be.equal("a")
    expect(list.head.prev).to.be.equal(null)
    expect(list.head.next).to.be.equal(null)
    expect(list.tail.data).to.be.equal("a")
    expect(list.length).to.be.equal(1) 
  })
  
  it("removeFront should remove the front of non-empty list", function(){
    list= new Structs.List()
    list.addToFront("a")
    .addToFront("b").addToFront("c")
    
    expected= [null, "b", "a", null]
    list.removeFront();
    cur= list.head;
    expect(expected[0]).to.be.equal(cur.prev);
    for(let i=1; i<expected.length-1; i++){
      if(i>1){
        expect(expected[i-1]).to.be.equal(cur.prev.data);
      }
      expect(expected[i]).to.be.equal(cur.data);
      cur= cur.next;
    }
    expect(expected[expected.length-1]).to.be.equal(cur)
    expect(list.tail.data).to.be.equal(expected[2])
    expect(list.length).to.be.equal(2)
  })
  
  it("removeFront should fail silenty for empty list", function(){
    list= new Structs.List()
    list.removeFront()
  })
  
   it("removeFront should reset properly when removing front results in empty list", function(){
    list= new Structs.List()
    list.addToFront("a");
    list.removeFront()
    expect(list.length).to.be.equal(0)
    expect(list.head).to.be.equal(null)
    expect(list.tail).to.be.equal(null)
})

 
  it("removeBack should remove the back of non-empty list", function(){
    list= new Structs.List()
    list.addToFront("a")
    .addToFront("b").addToFront("c")
    
    expected= [null, "c", "b", null]
    list.removeBack();
    cur= list.head;
    expect(expected[0]).to.be.equal(cur.prev);
    for(let i=1; i<expected.length-1; i++){
      if(i>1){
        expect(expected[i-1]).to.be.equal(cur.prev.data);
      }
      expect(expected[i]).to.be.equal(cur.data);
      cur= cur.next;
    }
    expect(expected[expected.length-1]).to.be.equal(cur)
    expect(list.tail.data).to.be.equal(expected[2])
    expect(list.length).to.be.equal(2)
  })
  
  it("removeBack should fail silenty for empty list", function(){
    list= new Structs.List()
    list.removeBack()
  })
  
   it("removeBack should reset properly when removing back results in empty list", function(){
    list= new Structs.List()
    list.addToFront("a");
    list.removeBack()
    expect(list.length).to.be.equal(0)
    expect(list.head).to.be.equal(null)
    expect(list.tail).to.be.equal(null)
})

it("insert should throw error when type is not number", function(){
    list= new Structs.List()
    expect(( () => list.insert("12", "Basketball"))).to.throw(TypeError);
})

it("insert should insert into middle of list", function(){
    list= new Structs.List()
    list.addToBack("a").addToBack("c").addToBack("d")
    expected= [null, "a", "b", "c", "d", null]
    list.insert(1, "b");
    cur= list.head;
    expect(expected[0]).to.be.equal(cur.prev);
    for(let i=1; i<expected.length-1; i++){
      if(i>1){
        expect(expected[i-1]).to.be.equal(cur.prev.data);
      }
      expect(expected[i]).to.be.equal(cur.data);
      cur= cur.next;
    }
    expect(expected[expected.length-1]).to.be.equal(cur)
    expect(list.tail.data).to.be.equal(expected[4])
    expect(list.length).to.be.equal(4)
    
})

it("remove should remove from middle of list", function(){
    list= new Structs.List()
    list.addToBack("a").addToBack("b").addToBack("d")
    expected= [null, "a", "d", null]
    list.remove(1);
    cur= list.head;
    expect(expected[0]).to.be.equal(cur.prev);
    for(let i=1; i<expected.length-1; i++){
      if(i>1){
        expect(expected[i-1]).to.be.equal(cur.prev.data);
      }
      expect(expected[i]).to.be.equal(cur.data);
      cur= cur.next;
    }
    expect(expected[expected.length-1]).to.be.equal(cur)
    expect(list.tail.data).to.be.equal(expected[2])
    expect(list.length).to.be.equal(2)
    
})


it("insert should throw error when index is out of bounds", function(){
    list= new Structs.List()
    list.addToBack("a").addToBack("b").addToBack("d")
    expected= [4, -1]
    expect(( () => list.insert(4))).to.throw(RangeError);
    expect(( () => list.insert(-1))).to.throw(RangeError);
    
})


it("remove should throw error when index is out of bounds", function(){
    list= new Structs.List()
    list.addToBack("a").addToBack("b").addToBack("d")
    expected= [4, -1]
    expect(( () => list.remove(4))).to.throw(RangeError);
    expect(( () => list.remove(-1))).to.throw(RangeError);
   
    
})

it("indexOf functions correctly", function(){
    list= new Structs.List()
    list.addToBack(0).addToBack(1).addToBack(2).addToBack(3)
    expected= [0, 1, 2, 3];
    
    for(let i=0; i<expected.length; i++){
      expect(expected.indexOf(i)).to.be.equal(list.indexOf(i));
    }
    expect(expected.indexOf(4)).to.be.equal(list.indexOf(4));
    
})

it("contains functions correctly", function(){
    list= new Structs.List()
    list.addToBack(0).addToBack(1).addToBack(2).addToBack(3)
    
    for(let i=0; i<list.length; i++){
      expect(list.contains(i)).to.be.equal(true);
    }
    expect(list.contains(4)).to.be.equal(false);
    
})


it("toArray makes array from list", function(){
    list= new Structs.List()
    list.addToBack(0).addToBack(1).addToBack(2).addToBack(3)
    let listArray = list.toArray();
    expected= [0, 1, 2, 3];
    expect(expected).to.deep.equal(listArray)
    
})

it("forEach function like array.forEach", function(){
    list= new Structs.List()
    list.addToBack([0]).addToBack([1]).addToBack([2]).addToBack([3])
    let actual = list.forEach(element => element[0]= element[0]+1).toArray()
    
    expected= [[1], [2], [3],[ 4]]
    expect(expected).to.deep.equal(actual)
})


})