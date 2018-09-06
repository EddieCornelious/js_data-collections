import HashTable from '../src/HashTable.js';
var expect = require('chai').expect;

describe('HashTable', function() {
  let map, expected, actual;

  beforeEach(function() {
    map = new HashTable();
  });

  beforeEach(function() {
    expected, map, (actual = null);
  });

  it('put inserts data into map correctly', function() {
    map.put('a', 'A');
    map.put('b', 'B');
    map.put('c', 'C');
    expect(map.getVal('a')).to.be.equal('A');
    expect(map.getVal('b')).to.be.equal('B');
    expect(map.getVal('c')).to.be.equal('C');
    expect(map.size()).to.be.equal(3);
  });

  it('put updates value if key already exists', function() {
    map.put('a', 'A');
    map.put('b', 'B');
    map.put('c', 'C');
    map.put('b', 'I like golf');
    expect(map.getVal('a')).to.be.equal('A');
    expect(map.getVal('b')).to.be.equal('I like golf');
    expect(map.getVal('c')).to.be.equal('C');
    expect(map.size()).to.be.equal(3);
  });

  it('getVal should work correctly throught multiple rehashes', function() {
    for (let i = 0; i < 100; i += 1) {
      map.put(i, i * 2);
    }
    for (let i = 0; i < 100; i += 1) {
      expect(map.getVal(i)).to.be.equal(i * 2);
    }
  });

  it('getVal should work correctly through multiple rehashes of ref types for values', function() {
    for (let i = 0; i < 1000; i += 1) {
      map.put(i, {
        data: i * 2
      });
    }
    for (let i = 0; i < 1000; i += 1) {
      expect(map.getVal(i).data).to.be.equal(i * 2);
    }
    expect(map.size()).to.be.equal(1000);
  });

  it('put should rehash inner table when .75 full', function() {
    for (let i = 0; i < 18; i += 1) {
      map.put(i, i);
    }
    expect(map.tableSize()).to.be.equal(26);
    for (let i = 18; i < 35; i += 1) {
      map.put(i, i);
    }
    expect(map.tableSize()).to.be.equal(52);
  });

  it('remove should return true if key exists and was removed', function() {
    map.put('a', 'Pizza');
    expect(map.remove('a')).to.be.equal(true);
    expect(map.getVal('a')).to.be.equal();
    expect(map.size()).to.be.equal(0);
  });

  it('remove should return false if key does not exist', function() {
    map.put('a', 'Pizza');
    expect(map.remove('b')).to.be.equal(false);
    expect(map.size()).to.be.equal(1);
  });

  it('remove should return false for empty table', function() {
    expect(map.remove('a')).to.be.equal(false);
    expect(map.size()).to.be.equal(0);
  });

  it('keys should return all keys in map', function() {
    map.put(0, 'c');
    map.put(1, 'doe');
    map.put('dog', 'doe');
    map.put('apple', 'doe');
    expected = ['dog', 0, 1, 'apple'];
    actual = map.keys();
    expect(actual).to.have.members(expected);
  });

  it('keys should return empty array for empty table', function() {
    actual = map.keys();
    expect(actual).to.have.members([]);
  });

  it('values should return all values in map', function() {
    map.put(0, 'c');
    map.put(1, 'doe');
    map.put('dog', 'doe');
    map.put('apple', 'doe');
    expected = ['doe', 'c', 'doe', 'doe'];
    actual = map.values();
    expect(actual).to.have.members(expected);
  });

  it('values should return empty array for empty table', function() {
    actual = map.values();
    expect(actual).to.have.members([]);
  });

  it('contains should return true when key exists and has value', function() {
    map.put('a', null).put('b', 0);
    expect(map.contains('a')).to.be.equal(true);
    expect(map.contains('b')).to.be.equal(true);
  });

  it('contains should return false when key does not exist (empty)', function() {
    expect(map.contains()).to.be.equal(false);
  });

  it('contains should return false when key does not exist (non-empty)', function() {
    map
      .put('a')
      .put('b')
      .put('c');
    expect(map.contains('d')).to.be.equal(false);
  });

  it('contains should return true when key exists but has no defined value', function() {
    map
      .put('a')
      .put('b')
      .put('c');
    expect(map.contains('a')).to.be.equal(true);
    expect(map.contains('b')).to.be.equal(true);
    expect(map.contains('c')).to.be.equal(true);
  });

  it('clear does clear hashtable and resets inner size', function() {
    map
      .put('a')
      .put('b')
      .put('c');
    map.clear();
    expect(map.tableSize()).to.be.equal(13);
    expect(map.size()).to.be.equal(0);
  });
});
