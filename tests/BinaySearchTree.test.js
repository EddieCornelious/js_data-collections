var Structs= require("../bundle.js");
var expect= require("chai").expect;


describe("Binary Search Tree", function(){
  let bst, expected, actual;
  it("insert should insert into empty tree", function(){
    bst = new Structs.BST()
    expected = ["a"]
    bst.insert("a", 1);
    actual = bst.inorder()
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
  })
  it("insert should insert into non empty tree right", function(){
    bst = new Structs.BST()
    expected = ["a", "b"]
    bst.insert("a", 1);
    bst.insert("b", 1);
    actual = bst.inorder()
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
  })
  it("insert should insert into non empty tree left", function(){
    bst = new Structs.BST()
    expected = ["a", "b"]
    bst.insert("b", 1);
    bst.insert("a", 1);
    actual = bst.inorder()
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
  })
  
  it("insert should not insert if key exists but update value", function(){
    bst = new Structs.BST()
    expected = ["b"]
    bst.insert("b", 1);
    bst.insert("b", 2);
    expect(bst.find("b")).to.be.equal(2)
    actual = bst.inorder()
    //ensure
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
  
});

it("remove 0 children case root", function(){
    bst = new Structs.BST()
    expected = []
    bst.insert("b", 1);
    bst.remove("b")
    actual = bst.inorder()
    for(let i=0; i<actual.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
});

it("remove 0 children case not root", function(){
    bst = new Structs.BST()
    expected = ["a", "b"]
    bst.insert("a", 1);
    bst.insert("b", 1);
    bst.insert("c", 1);
    bst.remove("c")
    actual = bst.inorder()
    for(let i=0; i<actual.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(expected.length).to.be.equal(actual.length)
});

it("remove case node has 1 child root", function(){
    bst = new Structs.BST()
    expected = ["b"]
    bst.insert("a", 1);
    bst.insert("b", 1);
    bst.remove("a")
    actual = bst.inorder()
    for(let i=0; i<actual.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(expected.length).to.be.equal(actual.length)
});

it("remove case node has 1 child not root", function(){
    bst = new Structs.BST()
    expected = ["a", "b", "d"]
    bst.insert("b", 1);
    bst.insert("a", 1);
    bst.insert("c", 1);
    bst.insert("d", 1);
    bst.remove("c")
    actual = bst.inorder()
    console.log(bst.root.right.key, bst.root.left.key)
    for(let i=0; i<actual.length; i++){
      expect(expected[i]).to.be.equal(actual[i]);
    }
    expect(expected.length).to.be.equal(actual.length)
});

});