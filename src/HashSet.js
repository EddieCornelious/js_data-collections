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
 * // FOR ALL EXAMPLES BELOW. ASSUME set IS CLEARED BEFORE EACH EXAMPLE
 */
class HashSet extends SetInterface {
  constructor(initialCapacity) {
    super();
    this.set = new HashTable(initialCapacity);
  }

  add(element) {
    return this.set.put(element);
  }

  has(element) {
    return this.set.contains(element);
  }

  remove(element) {
    return this.set.remove(element);
  }

  cardinality() {
    return this.set.size();
  }
}

module.exports = HashSet;
