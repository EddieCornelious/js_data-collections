import HashTable from './HashTable.js';
import MapInterface from './MapInterface.js';

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
class HashMap extends MapInterface {
  constructor(initialCapacity) {
    super();
    this.map = new HashTable(initialCapacity);
  }

  put(key, value) {
    return this.map.put(key, value);
  }

  getVal(key) {
    return this.map.getVal(key);
  }

  remove(key) {
    return this.map.remove(key);
  }

  keys() {
    return this.map.keys();
  }

  contains(key) {
    return this.map.contains(key);
  }

  size() {
    return this.map.size();
  }
}

module.exports = HashMap;
