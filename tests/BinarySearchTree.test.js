const Collections = require("../collections.js");
var expect = require("chai").expect;
describe("Binary Search Tree", function() {
  let bst, expected, actual;

  beforeEach(function() {
    bst = new Collections.BST();
  });

  afterEach(function() {
    bst
    , expected
    , actual = null;
  });

  it("insert should insert into empty tree", function() {
    expected = ["a"];
    bst.insert("a", 1);
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(bst.size()).to.be.equal(expected.length);
  });

  it("insert should insert into non empty tree right", function() {
    expected = ["a", "b"];
    bst.insert("a", 1);
    bst.insert("b", 1);
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(bst.size()).to.be.equal(expected.length);
  });

  it("insert should insert into non empty tree left", function() {
    expected = ["a", "b"];
    bst.insert("b", 1);
    bst.insert("a", 1);
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(bst.size()).to.be.equal(expected.length);
  });

  it("insert should not insert if key exists but update value", function() {
    expected = ["b"];
    bst.insert("b", 1);
    bst.insert("b", 2);
    expect(bst.find("b")).to.be.equal(2);
    actual = bst.inorder();
    //ensure
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(bst.size()).to.be.equal(expected.length);
  });
  
  it("remove of non-existent key does not alter size", function(){
    bst.insert("a").insert("b");
    bst.remove("c");
    expect(bst.size()).to.be.equal(2);
  });

  it("remove node with 0 children root case", function() {
    bst.insert("b", 1);
    bst.remove("b");
    expected = [{
      key: undefined
      , parent: undefined
    }];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent);
    }
    expect(bst.size()).to.be.equal(0);
  });

  it("remove node with 0 children not root case", function() {
    bst.insert("c", 1);
    bst.insert("a", 1);
    bst.insert("d", 1);
    bst.insert("f", 1);
    bst.remove("f");
    expected = [{
      key: "a"
      , parent: "c"
    }, {
      key: "c"
      , parent: undefined
    }, {
      key: "d"
      , parent: "c"
    }];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
    expect(bst.size()).to.be.equal(3);
  });

  it("remove node with 1 child root case", function() {
    bst.insert("m", 1);
    bst.insert("o", 1);
    bst.insert("n", 1);
    bst.insert("r", 1);
    bst.remove("m");
    expected = [{
        key: "n"
        , parent: "o"
      }, {
        key: "o"
        , parent: undefined
      }
      , {
        key: "r"
        , parent: "o"
      }
    ];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
    expect(bst.size()).to.be.equal(3);
  });

  it("remove node with 1 child rr case", function() {
    bst.insert("m", 1);
    bst.insert("a", 1);
    bst.insert("q", 1);
    bst.insert("v", 1);
    bst.insert("r", 1);
    bst.insert("w", 1);
    bst.remove("q");
    expected = [{
        key: "a"
        , parent: "m"
      }, {
        key: "m"
        , parent: undefined
      }
      , {
        key: "r"
        , parent: "v"
      }
      , {
        key: "v"
        , parent: "m"
      }
      , {
        key: "w"
        , parent: "v"
      }
    ];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
    expect(bst.size()).to.be.equal(5);
  });

  it("remove node with 1 child ll case", function() {
    bst.insert("m", 1);
    bst.insert("e", 1);
    bst.insert("t", 1);
    bst.insert("c", 1);
    bst.insert("a", 1);
    bst.insert("d", 1);
    bst.remove("e");
    expected = [{
        key: "a"
        , parent: "c"
      }, {
        key: "c"
        , parent: "m"
      }
      , {
        key: "d"
        , parent: "c"
      }
      , {
        key: "m"
        , parent: undefined
      }
      , {
        key: "t"
        , parent: "m"
      }
    ];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
    expect(bst.size()).to.be.equal(5);
  });

  it("remove node with 1 child rl case", function() {
    bst.insert("m", 1);
    bst.insert("a", 1);
    bst.insert("r", 1);
    bst.insert("p", 1);
    bst.insert("n", 1);
    bst.insert("q", 1);
    bst.remove("r");
    expected = [{
        key: "a"
        , parent: "m"
      }, {
        key: "m"
        , parent: undefined
      }
      , {
        key: "n"
        , parent: "p"
      }
      , {
        key: "p"
        , parent: "m"
      }
      , {
        key: "q"
        , parent: "p"
      }
    ];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
    expect(bst.size()).to.be.equal(5);
  });

  it("remove node with 1 child lr case", function() {
    bst.insert("m", 1);
    bst.insert("c", 1);
    bst.insert("t", 1);
    bst.insert("g", 1);
    bst.insert("d", 1);
    bst.insert("h", 1);
    bst.remove("c");
    expected = [{
        key: "d"
        , parent: "g"
      }, {
        key: "g"
        , parent: "m"
      }
      , {
        key: "h"
        , parent: "g"
      }
      , {
        key: "m"
        , parent: undefined
      }
      , {
        key: "t"
        , parent: "m"
      }
    ];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
    expect(bst.size()).to.be.equal(5);
  });

  it("remove node with 2 children root case", function() {
    bst.insert("m", 1);
    bst.insert("a", 1);
    bst.insert("p", 1);
    bst.insert("n", 1);
    bst.insert("q", 1);
    bst.remove("m");
    expected = [{
        key: "a"
        , parent: "n"
      }, {
        key: "n"
        , parent: undefined
      }
      , {
        key: "p"
        , parent: "n"
      }
      , {
        key: "q"
        , parent: "p"
      }
    ];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
    expect(bst.size()).to.be.equal(4);
  });

  it("remove node with 2 children not root case (1)", function() {
    bst.insert("e", 1);
    bst.insert("a", 1);
    bst.insert("j", 1);
    bst.insert("h", 1);
    bst.insert("k", 1);
    bst.insert("l", 1);
    bst.remove("j");
    expected = [{
        key: "a"
        , parent: "e"
      }, {
        key: "e"
        , parent: undefined
      }
      , {
        key: "h"
        , parent: "k"
      }
      , {
        key: "k"
        , parent: "e"
      }
      , {
        key: "l"
        , parent: "k"
      }
    ];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
    expect(bst.size()).to.be.equal(5);
  });

  it("remove node with 2 children not root case (2)", function() {
    bst.insert(50, 1);
    bst.insert(49, 1);
    bst.insert(75, 1);
    bst.insert(74, 1);
    bst.insert(89, 1);
    bst.insert(84, 1);
    bst.insert(85, 1);
    bst.remove(75);
    expected = [{
        key: 49
        , parent: 50
      }, {
        key: 50
        , parent: undefined
      }
      , {
        key: 74
        , parent: 84
      }
      , {
        key: 84
        , parent: 50
      }
      , {
        key: 85
        , parent: 89
      }
      , {
        key: 89
        , parent: 84
      }
    ];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
    expect(bst.size()).to.be.equal(6);
  });

  it("contains is true when tree contains key", function() {
    bst.insert("e", 1);
    bst.insert("a", 1);
    expect(bst.contains("a")).to.be.equal(true);
    expect(bst.contains("e")).to.be.equal(true);
  });

  it("contains is false when tree does not contain key", function() {
    bst.insert("e", 1);
    bst.insert("a", 1);
    expect(bst.contains("u")).to.be.equal(false);
    expect(bst.contains("f")).to.be.equal(false);
  });

  it("find returns correct value for key", function() {
    bst.insert("e", 1);
    bst.insert("a", "Boxer");
    expect(bst.find("e")).to.be.equal(1);
    expect(bst.find("a")).to.be.equal("Boxer");
  });

  it("find returns undefined for key for no existing key", function() {
    expect(bst.find("e")).to.be.equal(undefined);
  });
  
  it("key returns empty array for empty tree", function() {
    actual = bst.keys();
    expected = [];
    expect(actual).to.have.ordered.members(expected);
  });
  
  it("key returns all keys in the tree", function() {
    bst.insert(8).insert(12).insert(5);
    actual = bst.keys();
    expected = [5, 8, 12];
    expect(actual).to.have.ordered.members(expected);
  });
  
  it("min returns undefined for empty tree", function(){
    expect(bst.min()).to.be.equal();
  });
  
  it("min returns correct min when min is root", function(){
    bst.insert(1, 1).insert(2, 3);
    expect(bst.min()).to.be.equal(1);
  });
  
  it("min returns min when min is not root", function(){
    bst.insert(1, 1).insert(2, 3).insert(0, 0);
    expect(bst.min()).to.be.equal(0);
  });
  
  it("max returns undefined for empty tree", function(){
    expect(bst.max()).to.be.equal();
  });
  
  it("max returns correct max when max is root", function(){
    bst.insert(2, 1).insert(1, 3);
    expect(bst.max()).to.be.equal(2);
  });
  
  it("max returns correct max when max is not root", function(){
    bst.insert(2, 1).insert(3, 3).insert(1, 0);
    expect(bst.max()).to.be.equal(3);
  });
  
  it("keysLess returns empty array when tree is empty", function(){
    expect(bst.keysLess(3)).to.have.members([]);
  });
  
  it("keysLess returns array of smaller keys", function(){
    bst.insert(1, 1).insert(3, 4).insert(9, 3).insert(-67);
    expect(bst.keysLess(-67)).to.have.members([]);
    expect(bst.keysLess(1)).to.have.members([-67]);
    expect(bst.keysLess(3)).to.have.members([1, -67]);
    expect(bst.keysLess(9)).to.have.members([1, 3, -67]);
    expect(bst.keysLess(10)).to.have.members([1, 3, -67, 9]);
  });
  
  it("keysGreater returns array of larger keys", function(){
    bst.insert(1, 1).insert(3, 4).insert(9, 3).insert(-67);
    expect(bst.keysGreater(-67)).to.have.members([3, 1, 9]);
    expect(bst.keysGreater(1)).to.have.members([3, 9]);
    expect(bst.keysGreater(3)).to.have.members([9]);
    expect(bst.keysGreater(9)).to.have.members([]);
    expect(bst.keysGreater(-68)).to.have.members([1, 3, -67, 9]);
  });
  
   it("keysGreater|keysLess returns empty array when tree is empty", function(){
    expect(bst.keysGreater(45)).to.have.members([]);
    expect(bst.keysLess(45)).to.have.members([]);
  });
  
});