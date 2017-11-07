var Structs= require("../bundle.js");
var expect= require("chai").expect;
// modified inorder traversal that does not just show data, but all pointers.
// only good for testing as client will probably not care about color or parent
function inorder(node){
   if(node.key !== undefined){
     let tmp= [];
     return tmp.concat(inorder(node.left),node,inorder(node.right))
   }
  return [];
   
}


describe("AVL", function(){
  let avl, expected;
  it("insert should insert into empty tree", function(){
    avl= new Structs.AVL();
    avl.insert(1);
    let expected= [{key: 1, height: 1}];
    let actual= inorder(avl.root);
     expect(expected[0].key).to.be.equal(actual[0].key);
     expect(expected[0].height).to.be.equal(actual[0].height);
    
    
  });
  
  it("insert should insert into tree right side", function(){
    avl= new Structs.AVL();
    avl.insert(1);
    avl.insert(2);
    let expected= [{key: 1, height: 2}, {key: 2, height: 1}];
    let actual= inorder(avl.root);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
     
  });
  
   it("insert should insert into tree left side", function(){
    avl= new Structs.AVL();
    avl.insert(1);
    avl.insert(0);
    
    let expected= [{key: 0, height: 1}, {key: 1, height: 2}];
    let actual= inorder(avl.root);
     console.log(actual)
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
   
  });
  
   it("insert should rotate on right right case", function(){
    avl= new Structs.AVL();
    avl.insert(1);
    avl.insert(2);
    avl.insert(3);
    
    let expected= [{key: 1, height: 1}, {key: 2, height: 2}, {key: 3, height: 1}];
    let actual= inorder(avl.root);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
  });
  
   it("insert should double rotate on right left case", function(){
    avl= new Structs.AVL();
    avl.insert(4);
    avl.insert(6);
    avl.insert(5);
     let expected= [{key: 4, height: 1}, {key: 5, height: 2}, {key: 6, height: 1}];
    let actual= inorder(avl.root);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
    
  });
  
   it("insert should double rotate on left left case", function(){
    avl= new Structs.AVL();
    avl.insert(4);
    avl.insert(3);
    avl.insert(2);
   
     let expected= [{key: 2, height: 1}, {key: 3, height: 2}, {key: 4, height: 1}];
    let actual= inorder(avl.root);
    
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
  });
  
  it("insert should double rotate on left right case", function(){
    avl= new Structs.AVL();
    avl.insert(4);
    avl.insert(2);
    avl.insert(3);
     let expected= [{key: 2, height: 1}, {key: 3, height: 2}, {key: 4, height: 1}];
    let actual= inorder(avl.root);
    
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
  });
  
  it("insert should not allow duplicates", function(){
    avl= new Structs.AVL();
    avl.insert(4);
    avl.insert(2);
    avl.insert(3);
    avl.insert(4);
    avl.insert(2);
    avl.insert(3);
     let expected= [{key: 2, height: 1}, {key: 3, height: 2}, {key: 4, height: 1}];
    let actual= inorder(avl.root);
    expect(actual.length).to.be.equal(expected.length);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
  });
  
  it("remmove should remove from size 1 tree", function(){
    avl= new Structs.AVL();
    avl.insert(22);
    expect(avl.root.key).to.be.equal(22)
    
    avl.remove(22);
   
    expect(avl.root.key).to.be.equal(undefined);
    
    
  });
  
  it("remove should delete node with no children not root case(1)", function(){
    avl= new Structs.AVL();
    avl.insert(22);
    avl.insert(23);
    let expected= [{key: 22, height: 1}];
    avl.remove(23);
    let actual= inorder(avl.root);
    expect(actual.length).to.be.equal(expected.length);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
    
  });
  
   it("remove should delete node with one child root case", function(){
    avl= new Structs.AVL();
    avl.insert(22);
    avl.insert(23);
    let expected= [{key: 23, height: 1}];
    avl.remove(22);
    let actual= inorder(avl.root);
    expect(actual.length).to.be.equal(expected.length);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
  });
  
   it("remove should delete node with one child not root case", function(){
    avl= new Structs.AVL();
    avl.insert(22);
    avl.insert(23);
    avl.insert(24);
    avl.insert(25);
    
    let expected= [{key:22, height: 1}, {key:23, height:2}, {key:25, height: 1}];
    avl.remove(24);
    let actual = inorder(avl.root);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
  });
  
  it("remove should delete node with two children root case", function(){
    avl= new Structs.AVL();
    avl.insert(22);
    avl.insert(23);
    avl.insert(21);
    
    avl.remove(22);
    let expected= [{key:21, height: 1}, {key:23, height:2}];
    let actual = inorder(avl.root);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
  });
  
  it("remove should delete node with two children not root case", function(){
    avl= new Structs.AVL();
    avl.insert(40);
    avl.insert(77);
    avl.insert(10);
    avl.insert(68);
    avl.insert(81);
    avl.insert(9);
    avl.insert(80);
    avl.remove(77);
    let expected= [{key: 9, height: 1}, {key: 10,height: 2}, {key: 40, height: 3}, {key: 68, height: 1}, {key: 80, height:2}, {key: 81, height: 1}];
    let actual = inorder(avl.root);
    
    
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
  });
  
   it("remove should fix r-r violations when it caused it", function(){
    avl= new Structs.AVL();
    avl.insert(2);
    avl.insert(1);
    avl.insert(3)
    avl.insert(4)
    const expected= [{key: 2, height: 1}, {key: 3, height: 2}, {key: 4, height: 1}];
    avl.remove(1)
    const actual = inorder(avl.root);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
   
  });
  
   it("remove should fix r-l violations when it caused it", function(){
    avl= new Structs.AVL();
    avl.insert(10);
    avl.insert(1);
    avl.insert(12)
    avl.insert(11)
   
    avl.remove(1)
     
      const expected= [{key: 10, height: 1}, {key: 11, height: 2}, {key: 12, height: 1}];
 
    const actual = inorder(avl.root);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
    
   
  });
  
  it("remove should fix l-l violations when it caused it", function(){
    avl= new Structs.AVL();
    avl.insert(10);
    avl.insert(11);
    avl.insert(9)
    avl.insert(8)
    //console.log(avl)
    avl.remove(11)
     const expected= [{key: 8, height: 1}, {key: 9, height: 2}, {key: 10, height: 1}];
 
    const actual = inorder(avl.root);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
    
   
   
  });
  
   it("remove should fix l-r violations when it caused it", function(){
    avl= new Structs.AVL();
    avl.insert(10);
    avl.insert(11);
    avl.insert(7)
    avl.insert(8)
    
    avl.remove(11)
      const expected= [{key: 7, height: 1}, {key: 8, height: 2}, {key: 10, height: 1}];
 
    const actual = inorder(avl.root);
    for(let i=0; i<expected.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].height).to.be.equal(actual[i].height);
    }
    
   
   
  });
  
  
  
});