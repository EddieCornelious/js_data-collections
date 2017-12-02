var Structs= require("../bundle.js");
var expect= require("chai").expect;

describe("Trie", function(){
    let trie, actual, expected;
  beforeEach(function(){
    trie = new Structs.Trie()
  })
  afterEach(function(){
    trie, expected, actual = null;
  })
  it("addWord adds one word to trie", function(){
    trie.addWord("ever");
    expect(trie.containsWord("ever")).to.be.equal(true)
  });
  
  it("addWord adds word of length 1 to trie", function(){
    trie.addWord("e");
    expect(trie.containsWord("e")).to.be.equal(true)
  });
  
  it("addWord adds multiple similar-prefixed words  to trie", function(){
   
    trie.addWord("ever");
    trie.addWord("evermore");
    trie.addWord("eve");
    expect(trie.containsWord("ever")).to.be.equal(true)
    expect(trie.containsWord("evermore")).to.be.equal(true)
    expect(trie.containsWord("eve")).to.be.equal(true)
  });
  
  it("addWord adds multiple non-similar-prefixed words  to trie", function(){
   
    trie.addWord("apple");
    trie.addWord("banana");
    trie.addWord("peach");
    expect(trie.containsWord("peach")).to.be.equal(true)
    expect(trie.containsWord("banana")).to.be.equal(true)
    expect(trie.containsWord("apple")).to.be.equal(true)
  });
  
   it("addWord adds multiple non-similar-prefixed words  to trie", function(){
    
    trie.addWord("apple");
    trie.addWord("banana");
    trie.addWord("peach");
    expect(trie.containsWord("peach")).to.be.equal(true)
    expect(trie.containsWord("banana")).to.be.equal(true)
    expect(trie.containsWord("apple")).to.be.equal(true)
  });
  
    it("addword does not add empty string", function(){
    
    trie.addWord("");
    expect(trie.containsWord("")).to.be.equal(false);
    
  });
  
  
    it("prefixAll returns all words that have prefix all substrings", function(){
    
    trie.addWord("apple");
    expect(trie.prefixAll("a")).to.deep.equal(["apple"]);
    expect(trie.prefixAll("ap")).to.deep.equal(["apple"]);
    expect(trie.prefixAll("app")).to.deep.equal(["apple"]);
    expect(trie.prefixAll("appl")).to.deep.equal(["apple"]);
   
    
  });
  
   it("prefixAll return empty array if prefix is a word in trie with no children", function(){
    
    trie.addWord("apple");
    trie.addWord("app")
    expect(trie.prefixAll("apple")).to.deep.equal([]);
  });
  
   it("prefixAll return empty array if arg contains valid prefix but out of bounds suffix", function(){
  
    trie.addWord("apple");
    expect(trie.prefixAll("apples")).to.deep.equal([]);
  });
  
   it("prefixAll return empty array if arg contains valid prefix and inbounds suffix", function(){
    
    trie.addWord("apple");
    trie.addWord("apples");
    expect(trie.prefixAll("apple")).to.deep.equal(["apples"]);
  });
  
  it("prefixAll return empty array if arg's suffix is prefix", function(){
    
    trie.addWord("apple");
    expect(trie.prefixAll("snapple")).to.deep.equal([]);
  });
  
   it("prefixAll returs correct value when tree branches multiple times", function(){
   
    trie.addWord("a");
    trie.addWord("ab");
    trie.addWord("ac");
    trie.addWord("ad");
    actual = trie.prefixAll("a")
    expected = ["ab", "ac", "ad"]
    for(let i=0; i<actual.length; i++){
      expect(actual.indexOf(expected[i])).to.be.not.equal(-1)
    }
    expect(expected.length).to.be.equal(actual.length)
  });
  
   it("prefixAll empty prefix returns empty array", function(){
    
    trie.addWord("a");
    expect(trie.prefixAll("")).to.deep.equal([]);
  });
  
  
   it("prefixAll same letters should work properly", function(){
    
    trie.addWord("xxx");
    trie.addWord("xx");
    trie.addWord("x");
    expect(trie.prefixAll("x")).to.have.same.members(["xxx", "xx"]);
    expect(trie.prefixAll("xx")).to.have.same.members(["xxx"]);
    
  });
  
   it("containsWord silently fails when trie is empty ", function(){
   
    expect(trie.containsWord("betty")).to.be.equal(false)
    
  });
  
  
   it("containsPrefix works normally ", function(){
    trie.addWord("apple")
    expect(trie.containsPrefix("ap")).to.be.equal(true)
    
  });
  
   it("containsPrefix works normally ", function(){
    trie.addWord("apple")
    expect(trie.containsPrefix("apple")).to.be.equal(false)
    
  });
  
  it("containsPrefix works normally ", function(){
    trie.addWord("apple")
    expect(trie.containsPrefix("apples")).to.be.equal(false)
    
  });
  
  it("containsPrefix is true prefix is length one and exists ", function(){
    trie.addWord("apple")
    expect(trie.containsPrefix("a")).to.be.equal(true)
    
  });
  
   it("containsPrefix is false when prefix is length one and does not exists ", function(){
    trie.addWord("capple")
    expect(trie.containsPrefix("a")).to.be.equal(false)
    
  });
  
  it("containsPrefix return false if prefix is word and has no children ", function(){
    trie.addWord("capple")
    expect(trie.containsPrefix("capple")).to.be.equal(false)
    
  });
 
  
  it("containsPrefix return false if prefix is word is not in trie ", function(){
   
    expect(trie.containsPrefix("capple")).to.be.equal(false)
    
  });
  
  it("containsPrefix returns false for empty string", function(){
    trie.addWord("peach")
    trie.addWord("banana")
    expect(trie.containsPrefix("")).to.be.equal(false)
    
  });
  
   it("containsPrefix return true if prefix is word but has children ", function(){
    trie.addWord("capple")
    trie.addWord("capples")
    trie.addWord("capplea")
    expect(trie.containsPrefix("capple")).to.be.equal(true)
    
  });
  
  
   it("containsWord should work correctly ", function(){
    trie.addWord("capple")
    
    expect(trie.containsWord("capple")).to.be.equal(true)
    
  });
  
  it("containsWord should work correctly ", function(){
    trie.addWord("capple")
    trie.addWord("bapple")
    trie.addWord("napple")
    
    expect(trie.containsWord("tapple")).to.be.equal(false)
    
  });
  
  it("containsWord should work correctly wen word is prefix of another word ", function(){
    trie.addWord("capple")
    trie.addWord("capples")
    expect(trie.containsWord("capple")).to.be.equal(true)
    
  });
  
  it("containsWord should work correctly wen word is prefix  ", function(){
    trie.addWord("capple")
    trie.addWord("capples")
    expect(trie.containsWord("c")).to.be.equal(false)
    
  });
  
   it("containsWord should work correctly wen word is suffix of another word  ", function(){
    trie.addWord("capple")
    trie.addWord("capples")
    expect(trie.containsWord("capples")).to.be.equal(true)
    
  });
  
  it("containsWord should return false when word does not exist but has prefix in trie ", function(){
    trie.addWord("capple")
    trie.addWord("capples")
    expect(trie.containsWord("capplez")).to.be.equal(false)
    
  });
  
  
  

  
  
});
