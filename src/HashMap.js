import HashTable from './HashTable.js';

/**
 * HashMap representation
 * @class
 * @implements MapInterface
 * @param {number} [initialCapacity=13] - Initial size of the hashmap
 * IMPORTANT : It is not recommended that you choose a size that will be a
 * close or approximate upper bound on your data, so that number
 * of rehashes of the inner hashtable will be small. For example, if
 * you know you only need 100,000 inserts, a good initial capacity would not be
 * approximately 100,000 as the inner hastable will resize once 75,000
 * (75% of size) to 75,000 * 2 = 150,000. Next resize will be 0.75 * 150,000
 * which is 112,500 , greater than your space needed.
 * So, try something around 150,000. Or you can just rehash a lot :)
 *
 * @example
 * const map = new Collections.HashMap(37);
 */
class HashMap {
  constructor(initialCapacity) {
    this.map = new HashTable(initialCapacity);
  }

  put(key, value) {
    const self = this;
    self.map.put(key, value);
    return self;
  }

  getVal(key) {
    return this.map.getVal(key);
  }

  clear() {
    return this.map.clear();
  }

  remove(key) {
    return this.map.remove(key);
  }

  keys() {
    return this.map.keys();
  }

  values() {
    return this.map.values();
  }

  contains(key) {
    return this.map.contains(key);
  }

  size() {
    return this.map.size();
  }
}

export default HashMap;
