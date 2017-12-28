function getPrefix(pfx) {
  let cur = this.root.children;
  let char;
  for (let i = 0; i < pfx.length - 1; i += 1) {
    char = pfx.charAt(i);
    cur = cur[char].children;
  }
  return cur;
}
function recurseTree(node, arr) {
  const words = arr;
  if (!node) {
    return;
  }
  const keys = Object.keys(node.children);
  for (let i = 0; i < keys.length; i += 1) {
    const curChild = node.children[keys[i]];
    if (curChild.word) {
      words.push(curChild.word);
    }
    recurseTree(curChild, arr);
  }
}
function hasChild(obj) {
  for (let prop in obj) { // eslint-disable-line no-restricted-syntax
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return true;
    }
  }
  return false;
}

class TrieNode {
  constructor() {
    this.children = {};
    this.endOfWord = false;
    this.word = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let cur = this.root.children;
    if (word.length === 0) {
      return;
    }
    let wrd = word.toString().toLowerCase();
    let char;
    for (let i = 0; i < wrd.length; i += 1) {
      char = wrd.charAt(i);
      if (!cur[char]) {
        cur[char] = new TrieNode();
      }
      if (i === wrd.length - 1) {
        cur[char].endOfWord = true;
        cur[char].word = wrd;
      }
      cur = cur[char].children;
    }
  }

  containsWord(word) {
    if (word.length === 0) {
      return false;
    }
    let cur = this.root.children;
    // check contains word first
    for (let i = 0; i < word.length; i += 1) {
      let char = cur[word[i]];
      if (!char) {
        return false;
      } else if (char.word === word) {
        return true;
      }
      cur = cur[word[i]].children;
    }
    return false;
  }
  containsPrefix(pfx) {
    if (pfx.length === 0) {
      return false;
    }
    let cur = this.root.children;

    for (let i = 0; i < pfx.length; i += 1) {
      let char = pfx.charAt(i);
      if (!cur[char]) {
        return false;
      } else if (cur[char].word === pfx) {
        // if word and has no children, it cannot be prefix, but can be word and still be prefix
        const noChildren = hasChild(cur[char].children) === false;
        if (noChildren) {
          return false;
        }
        return true;
      }
      cur = cur[char].children;
    }
    return true;
  }
  prefixAll(pfx) {
    if (!this.containsPrefix(pfx)) {
      return [];
    }
    const prefixTail = getPrefix.call(this, pfx);
    const prefixes = [];
    const lastChar = pfx.charAt(pfx.length - 1);
    recurseTree(prefixTail[lastChar], prefixes);
    return prefixes;
  }
}
module.exports = Trie;
