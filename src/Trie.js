import {toString} from './Util.js';

/**
 * Converts the given data to a lowercase string
 * @private
 * @param {*} data - The data to convert
 * @returns @param data to a string
 */
function toLowerCaseString(data) {
  return toString(data).toLowerCase();
}
/**
 * Returns a reference to the tail of the prefix if trie contains it
 * @private
 * @param {TrieNode} root - The root of the trie
 * @param {string} prefix - The prefix to search for
 * @returns {(TrieNode|boolean)} Returns a reference to the prefix's last word
 * or false if prefix not found in trie
 */
function getNode(root, pattern) {
  if (pattern.length === 0) {
    return false;
  }
  let currentNode = root.children;
  let currentChar;
  for (let i = 0; i < pattern.length - 1; i += 1) {
    currentChar = pattern.charAt(i);
    if (!currentNode[currentChar]) {
      return false;
    }
    currentNode = currentNode[currentChar].children;
  }
  return currentNode;
}

/**
 * Recursively searches a trie to find all words starting at root
 * @private
 * @param {TrieNode} node - The starting node
 * @param {Array} array - The array to add words to
 * @returns {undefined}
 */
function recurseTree(trieNode, array) {
  if (!trieNode) {
    return;
  }
  // all character children
  const keys = Object.keys(trieNode);
  for (let i = 0; i < keys.length; i += 1) {
    const currentNode = trieNode[keys[i]];
    if (currentNode.endOfWord) {
      array.push(currentNode.word);
    }
    recurseTree(currentNode.children, array);
  }
}

/**
 * Reports whether the given trieNode has at least one child
 * @private
 * @param {TrieNode} trieNode - The trie node to check children of
 * @returns {boolean} True if the node has children and false otherwise
 */
function hasChild(trieNode) {
  if (!trieNode) {
    return false;
  }

  /**
   *Using this instead of Object.keys because I only need existence of one child
   *not all
   */
  // eslint-disable-next-line no-restricted-syntax
  for (let prop in trieNode) {
    if (Object.prototype.hasOwnProperty.call(trieNode, prop)) {
      return true;
    }
  }
  return false;
}

/**
 * Nodes for Trie
 * @class
 * @private
 */
class TrieNode {
  constructor() {
    this.children = {};
    this.endOfWord = false;
    this.word = null;
  }
}

/**
 * Trie (prefix tree) representation
 * @class
 *
 * @example
 * const trie = new Collections.Trie();
 * // FOR ALL EXAMPLES BELOW. ASSUME trie IS CLEARED BEFORE EACH EXAMPLE
 */
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * Converts the given data to string and adds it to trie
   * @param {*} word - The word to add into trie
   * @returns {undefined}
   */
  addWord(data = '') {
    let currentNode = this.root.children;
    const word = toLowerCaseString(data);
    let currentChar;
    for (let i = 0; i < word.length; i += 1) {
      currentChar = word.charAt(i);
      // path does not exist currently in trie
      if (!currentNode[currentChar]) {
        currentNode[currentChar] = new TrieNode();
      }
      // add end of word and word flags
      if (i === word.length - 1) {
        currentNode[currentChar].endOfWord = true;
        currentNode[currentChar].word = word;
      }
      // trickle down the tree
      currentNode = currentNode[currentChar].children;
    }
  }

  /**
   * Reports whether the trie contains the given word
   * @param {*} data - The data to search for
   * @returns {boolean} True if the trie contains @param data.toString()
   * or false if it does not
   */
  containsWord(data = '') {
    const word = toLowerCaseString(data);
    const foundWord = getNode(this.root, word);
    if (foundWord) {
      let lastChar = word.charAt(word.length - 1);
      if (foundWord[lastChar] && foundWord[lastChar].word === word) {
        return true;
      }
    }
    return false;
  }

  /*
  * trie.addWord("apple");
  * trie.addWord.("app");
  * trie.containsPrefix("apple"); // false
  * trie.containsPrefix("app"); // true
  */
  containsPrefix(prefix = '') {
    const root = this.root;
    const str = toLowerCaseString(prefix);
    const foundPrefix = getNode(root, str);
    if (foundPrefix) {
      let lastChar = str.charAt(str.length - 1);
      if (foundPrefix[lastChar]) {
        const hasChildren = hasChild(foundPrefix[lastChar].children);
        return hasChildren;
      }
    }
    return false;
  }

  /**
   * Gives all of the words in the trie with the given prefix
   * @param {*} prefix - The prefix to search for
   * @returns {Array} An array with all the words that are prefixed by
   * @param prefix
   *
   * @example
   * trie.addWord("apple");
   * trie.addWord.("app");
   * trie.prefixAll("app"); // returns only apple because app is equal to prefix
   */
  prefixAll(prefix = '') {
    if (!this.containsPrefix(prefix)) {
      return [];
    }
    const word = toLowerCaseString(prefix);
    const prefixTail = getNode(this.root, word);
    let lastChar = word.charAt(word.length - 1);
    const prefixes = [];
    recurseTree(prefixTail[lastChar].children, prefixes);
    return prefixes;
  }
}
export default Trie;
