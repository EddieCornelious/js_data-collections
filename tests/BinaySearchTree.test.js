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
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(actual.length).to.be.equal(expected.length)
  })
  it("insert should insert into non empty tree right", function(){
    bst = new Structs.BST()
    expected = ["a", "b"]
    bst.insert("a", 1);
    bst.insert("b", 1);
    actual = bst.inorder()
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(actual.length).to.be.equal(expected.length)
  })
  it("insert should insert into non empty tree left", function(){
    bst = new Structs.BST()
    expected = ["a", "b"]
    bst.insert("b", 1);
    bst.insert("a", 1);
    actual = bst.inorder()
    for(let i=0; i<expected.length; i++){
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(actual.length).to.be.equal(expected.length)
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
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(actual.length).to.be.equal(expected.length)
  
});

it("remove 0 children case root", function(){
    bst = new Structs.BST()
    bst.insert("b", 1);
    bst.remove("b")
    expected = [{key: undefined, parent: undefined}]
    actual = bst.inorder();
    for(let i=0; i<actual.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent);
    }
   
});


it("remove 0 children not root case", function(){
    bst = new Structs.BST()
    bst.insert("c", 1);
    bst.insert("a", 1)
    bst.insert("d", 1);
    bst.insert("f", 1);
    bst.remove("f")
    expected = [{key: "a", parent: "c"}, {key: "c", parent: undefined}, {key: "d", parent: "c"}]
    actual = bst.inorder();
    for(let i=0; i<actual.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
});


it("remove 1 children root case", function(){
    bst = new Structs.BST()
    bst.insert("m", 1);
    bst.insert("o", 1)
    bst.insert("n", 1);
    bst.insert("r", 1);
    bst.remove("m")
    expected = [{key: "n", parent: "o"}, {key: "o", parent: undefined},
    {key: "r", parent: "o"}]
    actual = bst.inorder();
    for(let i=0; i<actual.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
});


it("remove 1 children not root case rr", function(){
    bst = new Structs.BST()
    bst.insert("m", 1);
    bst.insert("a", 1)
    bst.insert("q", 1);
    bst.insert("v", 1);
    bst.insert("r", 1);
    bst.insert("w", 1);
    bst.remove("q")
    expected = [{key: "a", parent: "m"}, {key: "m", parent: undefined},
    {key: "r", parent: "v"},
    {key: "v", parent: "m"},
    {key: "w", parent: "v"}]
    actual = bst.inorder();
    for(let i=0; i<actual.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
});

it("remove 1 children not root case rl", function(){
    bst = new Structs.BST()
    bst.insert("m", 1);
    bst.insert("a", 1)
    bst.insert("r", 1);
    bst.insert("p", 1);
    bst.insert("n", 1);
    bst.insert("q", 1);
    bst.remove("r")
    expected = [{key: "a", parent: "m"}, {key: "m", parent: undefined},
    {key: "n", parent: "p"},
    {key: "p", parent: "m"},
    {key: "q", parent: "p"}]
    actual = bst.inorder();
    for(let i=0; i<actual.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
});

it("remove 2 children root case", function(){
    bst = new Structs.BST()
    bst.insert("m", 1);
    bst.insert("a", 1)
    bst.insert("p", 1);
    bst.insert("n", 1);
    bst.insert("q", 1);
    bst.remove("m")
    expected = [{key: "a", parent: "n"}, {key: "n", parent: undefined},
    {key: "p", parent: "n"},
    {key: "q", parent: "p"}]
    actual = bst.inorder();
    for(let i=0; i<actual.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
});

it("remove 2 children not root case", function(){
    bst = new Structs.BST()
    bst.insert("e", 1);
    bst.insert("a", 1)
    bst.insert("j", 1);
    bst.insert("h", 1);
    bst.insert("k", 1);
    bst.insert("l", 1);
    bst.remove("j")
    expected = [{key: "a", parent: "e"}, {key: "e", parent: undefined},
    {key: "h", parent: "k"},
    {key: "k", parent: "e"}, 
    {key: "l", parent: "k"}]
    actual = bst.inorder();
    for(let i=0; i<actual.length; i++){
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
});

});