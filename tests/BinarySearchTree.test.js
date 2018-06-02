const Collections = require("../collections.js");
var expect = require("chai").expect;
describe("Binary Search Tree", function() {
  let bst, expected, actual;

  beforeEach(function() {
    bst = new Collections.BST();
  });

  afterEach(function() {
    bst, expected, (actual = null);
  });

  it("put should put into empty tree", function() {
    expected = ["a"];
    bst.put("a", 1);
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(bst.size()).to.be.equal(expected.length);
  });

  it("put inserts truthy values and falsy values with no conflicts", function() {
    bst.put(0, "1").put(true, "2");
    expect(bst.contains(false)).to.be.equal(false);
    expect(bst.contains(0)).to.be.equal(true);
    expect(bst.contains(true)).to.be.equal(true);
    expect(bst.contains(1)).to.be.equal(false);
  });

  it("put inserts truthy values and falsy values with no conflicts", function() {
    bst.put(0, "1").put(true, "2");
    expect(bst.contains(false)).to.be.equal(false);
    expect(bst.contains(0)).to.be.equal(true);
    expect(bst.contains(true)).to.be.equal(true);
    expect(bst.contains(1)).to.be.equal(false);
  });

  it("put should put into non empty tree right", function() {
    expected = ["a", "b"];
    bst.put("a", 1);
    bst.put("b", 1);
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(bst.size()).to.be.equal(expected.length);
  });

  it("put should put into non empty tree left", function() {
    expected = ["a", "b"];
    bst.put("b", 1);
    bst.put("a", 1);
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(bst.size()).to.be.equal(expected.length);
  });

  it("put should not put if key exists but update value", function() {
    expected = ["b"];
    bst.put("b", 1);
    bst.put("b", 2);
    expect(bst.getVal("b")).to.be.equal(2);
    actual = bst.inorder();
    //ensure
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i]).to.be.equal(actual[i].key);
    }
    expect(bst.size()).to.be.equal(expected.length);
  });

  it("remove of non-existent key does not alter size", function() {
    bst.put("a").put("b");
    expect(bst.remove("c")).to.be.equal(false);
    expect(bst.size()).to.be.equal(2);
  });

  it("remove from empty tree fails silently", function() {
    expect(bst.remove("c")).to.be.equal(false);
    expect(bst.size()).to.be.equal(0);
  });

  it("remove node with 0 children root case", function() {
    bst.put("b", 1);
    expect(bst.remove("b")).to.be.equal(true);
    expected = [
      {
        key: undefined,
        parent: undefined
      }
    ];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent);
    }
    expect(bst.size()).to.be.equal(0);
  });

  it("remove node with 0 children not root case", function() {
    bst.put("c", 1);
    bst.put("a", 1);
    bst.put("d", 1);
    bst.put("f", 1);
    bst.remove("f");
    expected = [
      {
        key: "a",
        parent: "c"
      },
      {
        key: "c",
        parent: undefined
      },
      {
        key: "d",
        parent: "c"
      }
    ];
    actual = bst.inorder();
    for (let i = 0; i < actual.length; i += 1) {
      expect(expected[i].key).to.be.equal(actual[i].key);
      expect(expected[i].parent).to.be.equal(actual[i].parent.key);
    }
    expect(bst.size()).to.be.equal(3);
  });

  it("remove node with 1 child root case", function() {
    bst.put("m", 1);
    bst.put("o", 1);
    bst.put("n", 1);
    bst.put("r", 1);
    expect(bst.remove("m")).to.be.equal(true);
    expected = [
      {
        key: "n",
        parent: "o"
      },
      {
        key: "o",
        parent: undefined
      },
      {
        key: "r",
        parent: "o"
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
    bst.put("m", 1);
    bst.put("a", 1);
    bst.put("q", 1);
    bst.put("v", 1);
    bst.put("r", 1);
    bst.put("w", 1);
    expect(bst.remove("q")).to.be.equal(true);
    expected = [
      {
        key: "a",
        parent: "m"
      },
      {
        key: "m",
        parent: undefined
      },
      {
        key: "r",
        parent: "v"
      },
      {
        key: "v",
        parent: "m"
      },
      {
        key: "w",
        parent: "v"
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
    bst.put("m", 1);
    bst.put("e", 1);
    bst.put("t", 1);
    bst.put("c", 1);
    bst.put("a", 1);
    bst.put("d", 1);
    expect(bst.remove("e")).to.be.equal(true);
    expected = [
      {
        key: "a",
        parent: "c"
      },
      {
        key: "c",
        parent: "m"
      },
      {
        key: "d",
        parent: "c"
      },
      {
        key: "m",
        parent: undefined
      },
      {
        key: "t",
        parent: "m"
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
    bst.put("m", 1);
    bst.put("a", 1);
    bst.put("r", 1);
    bst.put("p", 1);
    bst.put("n", 1);
    bst.put("q", 1);
    expect(bst.remove("r")).to.be.equal(true);
    expected = [
      {
        key: "a",
        parent: "m"
      },
      {
        key: "m",
        parent: undefined
      },
      {
        key: "n",
        parent: "p"
      },
      {
        key: "p",
        parent: "m"
      },
      {
        key: "q",
        parent: "p"
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
    bst.put("m", 1);
    bst.put("c", 1);
    bst.put("t", 1);
    bst.put("g", 1);
    bst.put("d", 1);
    bst.put("h", 1);
    expect(bst.remove("c")).to.be.equal(true);
    expected = [
      {
        key: "d",
        parent: "g"
      },
      {
        key: "g",
        parent: "m"
      },
      {
        key: "h",
        parent: "g"
      },
      {
        key: "m",
        parent: undefined
      },
      {
        key: "t",
        parent: "m"
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
    bst.put("m", 1);
    bst.put("a", 1);
    bst.put("p", 1);
    bst.put("n", 1);
    bst.put("q", 1);
    expect(bst.remove("m")).to.be.equal(true);
    expected = [
      {
        key: "a",
        parent: "n"
      },
      {
        key: "n",
        parent: undefined
      },
      {
        key: "p",
        parent: "n"
      },
      {
        key: "q",
        parent: "p"
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
    bst.put("e", 1);
    bst.put("a", 1);
    bst.put("j", 1);
    bst.put("h", 1);
    bst.put("k", 1);
    bst.put("l", 1);
    expect(bst.remove("j")).to.be.equal(true);
    expected = [
      {
        key: "a",
        parent: "e"
      },
      {
        key: "e",
        parent: undefined
      },
      {
        key: "h",
        parent: "k"
      },
      {
        key: "k",
        parent: "e"
      },
      {
        key: "l",
        parent: "k"
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
    bst.put(50, 1);
    bst.put(49, 1);
    bst.put(75, 1);
    bst.put(74, 1);
    bst.put(89, 1);
    bst.put(84, 1);
    bst.put(85, 1);
    expect(bst.remove(75)).to.be.equal(true);
    expected = [
      {
        key: 49,
        parent: 50
      },
      {
        key: 50,
        parent: undefined
      },
      {
        key: 74,
        parent: 84
      },
      {
        key: 84,
        parent: 50
      },
      {
        key: 85,
        parent: 89
      },
      {
        key: 89,
        parent: 84
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
    bst.put("e", 1);
    bst.put("a", 1);
    expect(bst.contains("a")).to.be.equal(true);
    expect(bst.contains("e")).to.be.equal(true);
  });

  it("contains is false when tree does not contain key", function() {
    bst.put("e", 1);
    bst.put("a", 1);
    expect(bst.contains("u")).to.be.equal(false);
    expect(bst.contains("f")).to.be.equal(false);
  });

  it("getVal returns correct value for key", function() {
    bst.put("e", 1);
    bst.put("a", "Boxer");
    expect(bst.getVal("e")).to.be.equal(1);
    expect(bst.getVal("a")).to.be.equal("Boxer");
  });

  it("getVal returns undefined for key for empty tree", function() {
    expect(bst.getVal("e")).to.be.equal(undefined);
  });

  it("keys returns empty array for empty tree", function() {
    actual = bst.keys();
    expected = [];
    expect(actual).to.have.ordered.members(expected);
  });

  it("keys returns all keys in the tree", function() {
    bst
      .put(8)
      .put(12)
      .put(5);
    actual = bst.keys();
    expected = [5, 8, 12];
    expect(actual).to.have.ordered.members(expected);
  });

  it("values returns empty array for empty tree", function() {
    actual = bst.values();
    expected = [];
    expect(actual).to.have.ordered.members(expected);
  });

  it("values returns all keys in the tree", function() {
    bst
      .put(8, 1)
      .put(12, 44)
      .put(5, 1);
    actual = bst.values();
    expected = [1, 1, 44];
    expect(actual).to.have.ordered.members(expected);
  });

  it("min returns undefined for empty tree", function() {
    expect(bst.min()).to.be.equal();
  });

  it("min returns correct min when min is root", function() {
    bst.put(1, 1).put(2, 3);
    expect(bst.min()).to.be.equal(1);
  });

  it("min returns min when min is not root", function() {
    bst
      .put(1, 1)
      .put(2, 3)
      .put(0, 0);
    expect(bst.min()).to.be.equal(0);
  });

  it("max returns undefined for empty tree", function() {
    expect(bst.max()).to.be.equal();
  });

  it("max returns correct max when max is root", function() {
    bst.put(2, 1).put(1, 3);
    expect(bst.max()).to.be.equal(2);
  });

  it("max returns correct max when max is not root", function() {
    bst
      .put(2, 1)
      .put(3, 3)
      .put(1, 0);
    expect(bst.max()).to.be.equal(3);
  });

  it("keysLess returns array of smaller keys", function() {
    bst
      .put(1, 1)
      .put(3, 4)
      .put(9, 3)
      .put(-67);
    expect(bst.keysLess(-67)).to.have.members([]);
    expect(bst.keysLess(1)).to.have.members([-67]);
    expect(bst.keysLess(3)).to.have.members([1, -67]);
    expect(bst.keysLess(9)).to.have.members([1, 3, -67]);
    expect(bst.keysLess(10)).to.have.members([1, 3, -67, 9]);
  });

  it("keysGreater returns array of larger keys", function() {
    bst
      .put(1, 1)
      .put(3, 4)
      .put(9, 3)
      .put(-67);
    expect(bst.keysGreater(-67)).to.have.members([3, 1, 9]);
    expect(bst.keysGreater(1)).to.have.members([3, 9]);
    expect(bst.keysGreater(3)).to.have.members([9]);
    expect(bst.keysGreater(9)).to.have.members([]);
    expect(bst.keysGreater(-68)).to.have.members([1, 3, -67, 9]);
  });

  it("keysGreater|keysLess returns empty array when tree is empty", function() {
    expect(bst.keysGreater(45)).to.have.members([]);
    expect(bst.keysLess(45)).to.have.members([]);
  });

  it("keyRange returns all keys in given range when both bounds exist in tree", function() {
    bst
      .put(10, 10)
      .put(1, 1)
      .put(0, 0)
      .put(15, 15)
      .put(5, 5)
      .put(14, 14)
      .put(17, 17);
    expect(bst.keyRange(0, 17)).to.have.members(bst.keys());
  });

  it("keyRange returns all keys in given range when only upper exists in tree", function() {
    bst
      .put(10, 10)
      .put(1, 1)
      .put(0, 0)
      .put(15, 15)
      .put(5, 5)
      .put(14, 14)
      .put(17, 17);
    expect(bst.keyRange(2, 17)).to.have.members(
      bst.keys().filter(e => e !== 0 && e !== 1)
    );
  });

  it("keyRange returns all keys in given range when only lower exists in tree", function() {
    bst
      .put(10, 10)
      .put(1, 1)
      .put(0, 0)
      .put(15, 15)
      .put(5, 5)
      .put(14, 14)
      .put(17, 17);
    expect(bst.keyRange(0, 16)).to.have.members(
      bst.keys().filter(e => e !== 17)
    );
  });

  it("keyRange returns all keys in given range when neither bound exists in tree but all keys in range", function() {
    bst
      .put(10, 10)
      .put(1, 1)
      .put(0, 0)
      .put(15, 15)
      .put(5, 5)
      .put(14, 14)
      .put(17, 17);
    expect(bst.keyRange(-2, 82)).to.have.members(bst.keys());
  });

  it("keyRange returns empty array when keys out of range", function() {
    bst
      .put(10, 10)
      .put(1, 1)
      .put(0, 0)
      .put(15, 15)
      .put(5, 5)
      .put(14, 14)
      .put(17, 17);
    expect(bst.keyRange(18, 82)).to.have.members([]);
  });

  it("keyRange throws range error when lower is gt or equal to upper", function() {
    bst
      .put(10, 10)
      .put(1, 1)
      .put(0, 0)
      .put(15, 15)
      .put(5, 5)
      .put(14, 14)
      .put(17, 17);
    expect(() => bst.keyRange(0, -1)).to.throw(RangeError);
    expect(() => bst.keyRange(1, 1)).to.throw(RangeError);
  });
  it("keyRange throws type errors for undefined args", function() {
    bst
      .put(10, 10)
      .put(1, 1)
      .put(0, 0)
      .put(15, 15)
      .put(5, 5)
      .put(14, 14)
      .put(17, 17);
    expect(() => bst.keyRange()).to.throw(TypeError);
    expect(() => bst.keyRange(1)).to.throw(TypeError);
    expect(() => bst.keyRange(undefined, 1)).to.throw(TypeError);
  });
});
