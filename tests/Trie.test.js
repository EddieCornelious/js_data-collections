const Collections = require("../collections.js");
var expect = require("chai").expect;

describe("Trie", function() {
  let trie, actual, expected;

  beforeEach(function() {
    trie = new Collections.Trie();
  });

  afterEach(function() {
    trie,
    expected,
    actual = null;
  });

  it("addWord adds one word to trie", function() {
    trie.addWord("ever");
    expect(trie.containsWord("ever")).to.be.equal(true);
  });

  it("addWord adds word of length 1 to trie", function() {
    trie.addWord("e");
    expect(trie.containsWord("e")).to.be.equal(true);
  });

  it("addWord adds multiple similar-prefixed words  to trie", function() {
    trie.addWord("ever");
    trie.addWord("evermore");
    trie.addWord("eve");
    expect(trie.containsWord("ever")).to.be.equal(true);
    expect(trie.containsWord("evermore")).to.be.equal(true);
    expect(trie.containsWord("eve")).to.be.equal(true);
  });

  it("addWord adds words with repeated characters", function() {
    trie.addWord("xxx");
    trie.addWord("x");
    trie.addWord("xx");
    expect(trie.containsWord("xxx")).to.be.equal(true);
    expect(trie.containsWord("x")).to.be.equal(true);
    expect(trie.containsWord("xx")).to.be.equal(true);
    expect(trie.containsWord("xxxx")).to.be.equal(false);
  });

  it("addWord adds multiple non-similar-prefixed words to trie", function() {
    trie.addWord("apple");
    trie.addWord("banana");
    trie.addWord("peach");
    expect(trie.containsWord("peach")).to.be.equal(true);
    expect(trie.containsWord("banana")).to.be.equal(true);
    expect(trie.containsWord("apple")).to.be.equal(true);
  });

  it("addWord adds spaced words to trie", function() {
    trie.addWord("ap ple");
    trie.addWord("banan a");
    trie.addWord("p each");
    expect(trie.containsWord("p each")).to.be.equal(true);
    expect(trie.containsWord("banan a")).to.be.equal(true);
    expect(trie.containsWord("ap ple")).to.be.equal(true);

    expect(trie.containsWord("peach")).to.be.equal(false);
    expect(trie.containsWord("banana")).to.be.equal(false);
    expect(trie.containsWord("apple")).to.be.equal(false);
  });

  it("addWord does not add empty string to trie", function() {
    trie.addWord("");
    expect(trie.containsWord("")).to.be.equal(false);
  });

  it("prefixAll returns all words that have prefix all substrings", function() {
    trie.addWord("apple");
    expected = ["ap", "app", "appl", "a"];
    for (let i = 0; i < 4; i++) {
      actual = trie.prefixAll(expected[i]);
      expect(actual).to.have.same.members(["apple"]);
    }
  });

  it("prefixAll returns empty array if prefix is a word in trie with no children", function() {
    trie.addWord("apple");
    trie.addWord("app");
    expect(trie.prefixAll("apple")).to.have.same.members([]);
  });

  it("prefixAll returns empty array if prefix is not in trie", function() {
    trie.addWord("apple");
    expect(trie.prefixAll("apples")).to.have.same.members([]);
    expect(trie.prefixAll("aapple")).to.have.same.members([]);
    expect(trie.prefixAll("dapple")).to.have.same.members([]);
  });

  it("prefixAll returns correct value when tree branches multiple times from common root", function() {
    trie.addWord("a");
    trie.addWord("ab");
    trie.addWord("ac");
    trie.addWord("ad");
    actual = trie.prefixAll("a");
    expected = ["ab", "ac", "ad"];
    expect(actual).to.have.same.members(expected);
  });

  it("prefixAll empty argument prefix returns empty array", function() {
    trie.addWord("");
    trie.addWord("a");
    expect(trie.prefixAll("")).to.have.same.members([]);
  });

  it("prefixAll same letters should work properly", function() {
    trie.addWord("xxx");
    trie.addWord("xx");
    trie.addWord("x");
    expect(trie.prefixAll("x")).to.have.same.members(["xxx", "xx"]);
    expect(trie.prefixAll("xx")).to.have.same.members(["xxx"]);
    expect(trie.prefixAll("xxx")).to.have.same.members([]);
  });

  it("containsPrefix works normally ", function() {
    trie.addWord("apple");
    expect(trie.containsPrefix("ap")).to.be.equal(true);
  });

  it("containsPrefix works normally ", function() {
    trie.addWord("apple");
    expect(trie.containsPrefix("a")).to.be.equal(true);
    expect(trie.containsPrefix("ap")).to.be.equal(true);
    expect(trie.containsPrefix("ap")).to.be.equal(true);
    expect(trie.containsPrefix("appl")).to.be.equal(true);
    expect(trie.containsPrefix("apple")).to.be.equal(false);
  });

  it("containsPrefix works normally (2) ", function() {
    trie.addWord("apple");
    expect(trie.containsPrefix("apples")).to.be.equal(false);
  });

  it("containsPrefix returns false for empty string", function() {
    trie.addWord("peach");
    trie.addWord("banana");
    expect(trie.containsPrefix("")).to.be.equal(false);
  });

  it("containsPrefix return true if prefix is word and has children ", function() {
    trie.addWord("capple");
    trie.addWord("capples");
    trie.addWord("capplea");
    expect(trie.containsPrefix("capple")).to.be.equal(true);
  });

  it("containsWord silently fails when trie is empty ", function() {
    expect(trie.containsWord("betty")).to.be.equal(false);
    expect(trie.containsWord("")).to.be.equal(false);
  });

  it("containsWord should return true when word is in trie", function() {
    trie.addWord("capple");
    expect(trie.containsWord("capple")).to.be.equal(true);
  });

  it("containsWord should return false when word is not in trie ", function() {
    trie.addWord("capple");
    trie.addWord("bapple");
    trie.addWord("napple");
    expect(trie.containsWord("tapple")).to.be.equal(false);
  });

  it("containsWord should work correctly when word is prefix of another word ", function() {
    trie.addWord("capple");
    trie.addWord("capples");
    expect(trie.containsWord("capple")).to.be.equal(true);

  });

  it("containsWord should work correctly when word is only a prefix in trie  ", function() {
    trie.addWord("capple");
    trie.addWord("capples");
    expect(trie.containsWord("c")).to.be.equal(false);
  });

  it("containsWord should work correctly when word is suffix of another word  ", function() {
    trie.addWord("capple");
    trie.addWord("capples");
    expect(trie.containsWord("capples")).to.be.equal(true);

  });

  it("containsWord should return false when word does not exist but has prefix in trie ", function() {
    trie.addWord("capple");
    trie.addWord("capples");
    expect(trie.containsWord("capplez")).to.be.equal(false);

  });
});