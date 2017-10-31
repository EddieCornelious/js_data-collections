//inorder traversal
function Test(node) {
  if (node) {
    let tmp = [];
    return tmp.concat(Test(node.left), node, Test(node.right));
  }
  return [];
}

var RBTree= require("../bundle.js").RBTree;
var expect= require("chai").expect;

describe("RBTree", function() {
  let x;
  it("insert into empty tree should recolor root", function() {
    x = new RBTree();
    x.insert(1, 2);
    let expected = ["black", undefined, 1, 2, null];
    expect(x.root.color).to.be.equal(expected[0]);
    expect(x.root.parent.color).to.be.equal(expected[0]);
    expect(x.root.parent.key).to.be.equal(expected[1]);
    expect(x.root.left.key).to.be.equal(expected[1]);
    expect(x.root.right.key).to.be.equal(expected[1]);
    expect(x.root.key).to.be.equal(expected[2]);
    expect(x.root.value).to.be.equal(expected[3]);
    expect(x.root.parent.parent).to.be.equal(expected[4]);
  });

  it("insert should recolor p and uncle when uncle is red", function() {
    x = new RBTree();
    x.insert(1, 2);
    x.insert(2, 4);
    x.insert(0, 44);
    x.insert(3, 7);
    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 0, value: 44, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 1, value: 2, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 2, value: 4, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 3, value: 7, color: "red" },
      { key: undefined, value: undefined, color: "black" },
      { key: undefined, value: undefined, color: "black" }
    ];
    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("insert should rotate on RR case when uncle is black", function() {
    x = new RBTree();
    x.insert(20, 2);
    x.insert(30, 3);
    x.insert(40, 4);
    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 20, value: 2, color: "red" },
      { key: undefined, value: undefined, color: "black" },
      { key: 30, value: 3, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 40, value: 4, color: "red" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("insert should rotate on RL case when uncle is black", function() {
    x = new RBTree();
    x.insert(20, 2);
    x.insert(30, 3);
    x.insert(25, 5);
    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 20, value: 2, color: "red" },
      { key: undefined, value: undefined, color: "black" },
      { key: 25, value: 5, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 30, value: 3, color: "red" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("insert should rotate on LL case when uncle is black", function() {
    x = new RBTree();
    x.insert(20, 2);
    x.insert(10, 3);
    x.insert(5, 5);
    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 5, value: 5, color: "red" },
      { key: undefined, value: undefined, color: "black" },
      { key: 10, value: 3, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 20, value: 2, color: "red" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("insert should rotate on LR case when uncle is black", function() {
    x = new RBTree();
    x.insert(20, 2);
    x.insert(10, 3);
    x.insert(15, 5);
    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 10, value: 3, color: "red" },
      { key: undefined, value: undefined, color: "black" },
      { key: 15, value: 5, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 20, value: 2, color: "red" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });
  it("remove should simply remove node normally when red", function() {
    x = new RBTree();
    x.insert(20, 2);
    x.insert(30, 3);
    x.insert(10, 5);
    x.remove(30);
    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 10, value: 5, color: "red" },
      { key: undefined, value: undefined, color: "black" },
      { key: 20, value: 2, color: "black" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("remove should fix double black case-sibling is right child and red is right", function() {
    x = new RBTree();
    x.insert(30, 3);
    x.insert(20, 2);
    x.insert(40, 4);
    x.insert(60, 6);
    x.remove(20);
    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 30, value: 3, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 40, value: 4, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 60, value: 6, color: "black" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("remove should fix double black case-sibling right child and red is left", function() {
    x = new RBTree();
    x.insert(30, 3);
    x.insert(20, 2);
    x.insert(40, 4);
    x.insert(60, 6);
    //deliberately keep prior inserts
    x.remove(20);
    x.insert(50, 5);
    x.remove(30);
    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 40, value: 4, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 50, value: 5, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 60, value: 6, color: "black" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("remove should fix double black case-sibling left child and red is left", function() {
    x = new RBTree();
    x.insert(30, 3);
    x.insert(20, 2);
    x.insert(40, 4);
    x.insert(60, 6);
    //deliberately keep prior inserts and deletions
    x.remove(20);
    x.insert(50, 5);
    x.remove(30);
    x.insert(30, 3);
    x.remove(60);
    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 30, value: 3, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 40, value: 4, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 50, value: 5, color: "black" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("remove should fix double black case-sibling left child and red is right", function() {
    x = new RBTree();
    x.insert(30, 3);
    x.insert(20, 2);
    x.insert(40, 4);
    x.insert(60, 6);
    //deliberately keep prior inserts and deletions
    x.remove(20);
    x.insert(50, 5);
    x.remove(30);
    x.insert(30, 3);
    x.remove(60);
    x.insert(35, 35);
    x.remove(50);
    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 30, value: 3, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 35, value: 35, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 40, value: 4, color: "black" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("remove should fix double black case-sibling is black and both sibling's children are black (node deleted was left child)", function() {
    x = new RBTree();
    x.insert(20, 3);
    x.insert(10, 2);
    x.insert(30, 2);
    x.insert(40, 2);
    x.remove(40);
    x.remove(10);

    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 20, value: 3, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 30, value: 2, color: "red" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("delete should fix double black case-sibling is black and both sibling's children are black (node deleted was right child)", function() {
    x = new RBTree();
    x.insert(20, 3);
    x.insert(10, 2);
    x.insert(30, 2);
    x.insert(40, 2);
    x.remove(40);
    x.remove(30);

    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 10, value: 2, color: "red" },
      { key: undefined, value: undefined, color: "black" },
      { key: 20, value: 3, color: "black" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("remmove should fix double black case-sibling is red and is left child", function() {
    x = new RBTree();
    x.insert(20, 20);
    x.insert(10, 10);
    x.insert(30, 30);
    x.insert(40, 40);
    x.insert(25, 25);
    x.insert(50, 50);
    x.remove(50);
    x.remove(10);
    //case met

    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 20, value: 20, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 25, value: 25, color: "red" },
      { key: undefined, value: undefined, color: "black" },
      { key: 30, value: 30, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 40, value: 40, color: "black" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });

  it("remove should fix double black case-sibling is red and is right child", function() {
    x = new RBTree();
    x.insert(20, 20);
    x.insert(10, 10);
    x.insert(30, 30);
    x.insert(5, 5);
    x.insert(15, 15);
    x.insert(16, 16);
    x.remove(16);
    x.remove(30);
    //case met

    let actual = Test(x.root);
    let expected = [
      { key: undefined, value: undefined, color: "black" },
      { key: 5, value: 5, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 10, value: 10, color: "black" },
      { key: undefined, value: undefined, color: "black" },
      { key: 15, value: 15, color: "red" },
      { key: undefined, value: undefined, color: "black" },
      { key: 20, value: 20, color: "black" },
      { key: undefined, value: undefined, color: "black" }
    ];

    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].key).to.be.equal(expected[i].key);
      expect(actual[i].value).to.be.equal(expected[i].value);
      expect(actual[i].color).to.be.equal(expected[i].color);
    }
  });
});
