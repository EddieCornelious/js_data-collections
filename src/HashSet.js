import HashTable from './HashTable.js';
import SetInterface from './SetInterface.js';

/**
 * HashSet representation
 * @class
 * @implements SetInterface
 * @param {number} [initialCapacity=13] - The initial size of the hashset
 *
 * @example
 * const set = new Collections.HashSet();
 */
class HashSet extends SetInterface {
  constructor(initialCapacity) {
    super();
    this.set = new HashTable(initialCapacity);
  }

  add(element) {
    this.set.put(element);
    return this;
  }

  has(element) {
    return this.set.contains(element);
  }

  remove(element) {
    this.set.remove(element);
    return this;
  }

  keys() {
    return this.set.keys();
  }

  cardinality() {
    return this.set.size();
  }
}

module.exports = HashSet;
