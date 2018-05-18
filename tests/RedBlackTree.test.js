import RBTree from "../src/RedBlackTree.js";
var expect = require("chai").expect;

// custom inorder function to help test colors and all references of tree
// Since rb tree is so tricky, need to test color of undefined nodes as well
// Normally, I would not care about nil children, but delete often is
// dependent on the color of the nil node and is not
// ignored (double black cases etc..)
function Test(node) {
  if (node) {
    let tmp = [];
    return tmp.concat(Test(node.left), node, Test(node.right));
  }
  return [];
}

describe("RB", function() {
  let rb, expected, actual;

  beforeEach(function() {
    rb = new RBTree();
  });

  afterEach(function() {
    rb, expected, (actual = null);
  });

  it("put into empty tree should recolor root", function() {
    rb.put(1, 2);
    expected = ["black", undefined, 1, 2, null];
    expect(rb.root.color).to.be.equal(expected[0]);
    expect(rb.root.parent.color).to.be.equal(expected[0]);
    expect(rb.root.parent.key).to.be.equal(expected[1]);
    expect(rb.root.left.key).to.be.equal(expected[1]);
    expect(rb.root.right.key).to.be.equal(expected[1]);
    expect(rb.root.key).to.be.equal(expected[2]);
    expect(rb.root.value).to.be.equal(expected[3]);
    expect(rb.root.parent.parent).to.be.equal(expected[4]);
  });

  it("put should recolor p and uncle when uncle is red", function() {
    rb.put(1, 2);
    rb.put(2, 4);
    rb.put(0, 44);
    rb.put(3, 7);
    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 0,
        value: 44,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 1,
        value: 2,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 2,
        value: 4,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 3,
        value: 7,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];
    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("put should rotate on RR case when uncle is black", function() {
    rb.put(20, 2);
    rb.put(30, 3);
    rb.put(40, 4);

    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 20,
        value: 2,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 30,
        value: 3,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 40,
        value: 4,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("put should rotate on RL case when uncle is black", function() {
    rb.put(20, 2);
    rb.put(30, 3);
    rb.put(25, 5);
    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 20,
        value: 2,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 25,
        value: 5,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 30,
        value: 3,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("put should rotate on LL case when uncle is black", function() {
    rb.put(20, 2);
    rb.put(10, 3);
    rb.put(5, 5);
    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 5,
        value: 5,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 10,
        value: 3,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 20,
        value: 2,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("put should rotate on LR case when uncle is black", function() {
    rb.put(20, 2);
    rb.put(10, 3);
    rb.put(15, 5);
    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 10,
        value: 3,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 15,
        value: 5,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 20,
        value: 2,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("delete should simply remove node normally when red", function() {
    rb.put(20, 2);
    rb.put(30, 3);
    rb.put(10, 5);
    let rm = rb.remove(30);
    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 10,
        value: 5,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 20,
        value: 2,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
    expect(rm).to.be.equal(true);
  });

  it("delete should fix double black case-sibling is right child and red is right", function() {
    rb.put(30, 3);
    rb.put(20, 2);
    rb.put(40, 4);
    rb.put(60, 6);
    let rm = rb.remove(20);
    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 30,
        value: 3,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 40,
        value: 4,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 60,
        value: 6,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
    expect(rm).to.be.equal(true);
  });

  it("delete should fix double black case-sibling right child and red is left", function() {
    rb.put(30, 3);
    rb.put(20, 2);
    rb.put(40, 4);
    rb.put(60, 6);
    //deliberately keep prior puts
    rb.remove(20);
    rb.put(50, 5);
    let rm = rb.remove(30);
    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 40,
        value: 4,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 50,
        value: 5,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 60,
        value: 6,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
    expect(rm).to.be.equal(true);
  });

  it("delete should fix double black case-sibling left child and red is left", function() {
    rb.put(30, 3);
    rb.put(20, 2);
    rb.put(40, 4);
    rb.put(60, 6);
    //deliberately keep prior puts and deletions
    rb.remove(20);
    rb.put(50, 5);
    rb.remove(30);
    rb.put(30, 3);
    let rm = rb.remove(60);
    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 30,
        value: 3,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 40,
        value: 4,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 50,
        value: 5,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
    expect(rm).to.be.equal(true);
  });

  it("delete should fix double black case-sibling left child and red is right", function() {
    rb.put(30, 3);
    rb.put(20, 2);
    rb.put(40, 4);
    rb.put(60, 6);
    //deliberately keep prior puts and deletions
    rb.remove(20);
    rb.put(50, 5);
    rb.remove(30);
    rb.put(30, 3);
    rb.remove(60);
    rb.put(35, 35);
    let rm = rb.remove(50);
    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 30,
        value: 3,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 35,
        value: 35,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 40,
        value: 4,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
    expect(rm).to.be.equal(true);
  });

  it("delete should fix double black case-sibling is black and both sibling's children are black (node deleted was left child)", function() {
    rb.put(20, 3);
    rb.put(10, 21);
    rb.put(30, 22);
    rb.put(40, 2);
    rb.remove(40);
    let rm = rb.remove(10);

    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 20,
        value: 3,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 30,
        value: 22,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
    expect(rm).to.be.equal(true);
  });

  it("delete should fix double black case-sibling is black and both sibling's children are black (node deleted was right child)", function() {
    rb.put(20, "20");
    rb.put(10, "10");
    rb.put(30, "30");
    rb.put(40, "40");
    rb.remove(40);
    let rm = rb.remove(30);

    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 10,
        value: "10",
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 20,
        value: "20",
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
    expect(rm).to.be.equal(true);
  });

  it("delete should fix double black case-sibling is red and is left child", function() {
    rb.put(20, 20);
    rb.put(10, 10);
    rb.put(30, 30);
    rb.put(40, 40);
    rb.put(25, 25);
    rb.put(50, 50);
    rb.remove(50);
    let rm = rb.remove(10);
    //case met

    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 20,
        value: 20,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 25,
        value: 25,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 30,
        value: 30,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 40,
        value: 40,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
    expect(rm).to.be.equal(true);
  });

  it("delete should fix double black case-sibling is red and is right child", function() {
    rb.put(20, 20);
    rb.put(10, 10);
    rb.put(30, 30);
    rb.put(5, 5);
    rb.put(15, 15);
    rb.put(16, 16);
    rb.remove(16);
    let rm = rb.remove(30);
    //case met

    actual = Test(rb.root);
    expected = [
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 5,
        value: 5,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 10,
        value: 10,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 15,
        value: 15,
        color: "red"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      },
      {
        key: 20,
        value: 20,
        color: "black"
      },
      {
        key: undefined,
        value: undefined,
        color: "black"
      }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
    expect(rm).to.be.equal(true);
  });
});
