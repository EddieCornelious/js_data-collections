import { toString } from './Util.js';

/**
 * From immutable.js implementation of java hashcode
 * https://github.com/facebook/immutable-js/blob/master/src/Hash.js
 * better distribution than fnv hash
 *
 * Returns the hashcode for a string
 * @private
 * @param {string} str - The string to hash
 * @returns {number} @param str's hashcode
 */
function hashStr(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = ((31 * hash) + str.charCodeAt(i)) | 0;
  }
  return hash;
}

/**
 * Returns the modulo of two numbers
 * @private
 * @param {number} dividend - The dividend
 * @param {number} divisor - The divisor
 * @returns {number} Positive number when (dividend mod divisor) is calculated
 */
function mod(dividend, divisor) {
  const modulo = dividend % divisor;
  if (dividend < 0) {
    return modulo * -1;
  }
  return modulo;
}

/**
 * Creates a 2 dimensional array of a certain size
 * @private
 * @param {number} size - The size of the 2d array
 * @returns {Array} A 1d array with @param size inner arrays
 */
function createTable(size) {
  const newTable = [];
  for (let i = 0; i < size; i += 1) {
    newTable.push([]);
  }
  return newTable;
}

/**
 * Inserts into a hashtable based on a hashcode of the given key
 * @private
 * @param {*} key - The key
 * @param {*} value - The value mapped to by key
 * @param {Array} table - Associative Array
 * @returns {number} 1 for true
 */
function insert(key, value, table) {
  const hash = hashStr(toString(key) + typeof key);
  const location = mod(hash, table.length);
  const bucket = table[location];
  return bucket.push(key, value);
}

/**
 * Searches a hashtable based on the hashcode of the given key
 * @private
 * @param {*} key - Key to look for
 * @param {Array} table - Associative Array
 * @returns {Object} Objet literal with the bucket where @param key is found
 * and the index of @param key in that bucket or undefined and -1 if not found
 */
function search(key, table) {
  const toStr = toString(key);
  const hash = hashStr(toStr + typeof key);
  const location = mod(hash, table.length);
  const bucket = table[location];
  // skip values [k1, v1, k2, v2]
  for (let index = 0; index < bucket.length; index += 2) {
    if (key === bucket[index]) {
      return { bucket, index };
    }
  }
  return { bucket: undefined, index: -1 };
}

/**
 * Figures out if a given hashtable should grow larger
 * @private
 * @param {number} inserts - The number of items in the table
 * @param {Array} table - Associative Array
 * @returns {boolean} True if table should rehash and false otherwise
 */
function shouldRehash(inserts, table) {
  const loadFactor = (inserts / table.length);
  return loadFactor >= 0.75 ? true : false;
}

/**
 * HashMap representation
 * @class
 * @param {number} [initialCapacity=13] - Initial size of the hashmap
 * IMPORTANT : It is not recommended that you choose a size that will be a
 * close or approximate upper bound on your data, so that number
 * of rehashes of the inner hashtable will be small. For example, if
 * you know you only need 100,000 inserts, a good initial capacity would not be
 * approximately 100,000 as the hastable will resize once 75,000
 * (75% of size) to 75,000 * 2 = 150,000. Next resize will be 0.75 * 150,000
 * which is 112,500 , greater than your space needed.
 * So, try something around 150,000. Or you can just rehash a lot :)
 *
 * @example
 * const map = new Collections.HashMap(37);
 * // FOR ALL EXAMPLES BELOW. ASSUME map IS CLEARED BEFORE EACH EXAMPLE
 */
class HashMap {
  constructor(initialCapacity = 13) {
    this.inserts = 0;
    this.table = createTable(initialCapacity);
  }

  /**
   * Inserts given key and value into HashMap
   * @param {*} key - The key
   * @param {*} value - The value mapped to by @param key
   * @returns {boolean} True
   *
   * @example
   * map.put("ed", "jones");
   * // ed maps to jones
   * map.put("ed", "james");
   * // now same ed maps to james
   */
  put(key = null, value = null) {
    const { table, inserts } = this;
    const searchRes = search(key, table);
    const { bucket, index } = searchRes;
    if (index === -1) {
      insert(key, value, table);
      this.inserts += 1;
      if (shouldRehash(inserts + 1, table)) {
        this.rehash();
      }
    } else {
      bucket[index + 1] = value;
    }
    return true;
  }

  /**
   * Retrieves the value mapped to by the given key
   * @param {*} key - The key to lookup
   * @returns {*} The value associated with @param key
   *
   * @example
   * map.put(99, "problems");
   * map.getVal(99); // returns "promblems"
   */
  getVal(key) {
    const searchRes = search(key, this.table);
    const { bucket, index } = searchRes;
    return index !== -1 ? bucket[index + 1] : undefined;
  }

  /**
   * Removes the given key and its associated value from the HashMap
   * @param {*} key - The key to lookup
   * @returns {boolean} True if the key was removed and false otherwise
   *
   * @example
   * map.put(99, "problems");
   * map.remove(88); // returns false
   * map.remove(99); // return true
   */
  remove(key) {
    const searchRes = search(key, this.table);
    const { bucket, index } = searchRes;
    if (index !== -1) {
      bucket.splice(index, 2);
      this.inserts -= 1;
      return true;
    }
    return false;
  }

  /**
   * Reports whether the HashMap contains the given key
   * @param {*} key - The key to lookup
   * @returns {boolean} True if @param key is found and false otherwise
   *
   * @example
   * map.contains("empty"); // return false
   */
  contains(key) {
    return this.getVal(key) !== undefined;
  }

  /**
   * Resizes (2x) and rehashes all keys in HashMap
   * @returns {undefined}
   */
  rehash() {
    const oldTable = this.table;
    const newTable = createTable(oldTable.length * 2);
    for (let i = 0; i < oldTable.length; i += 1) {
      for (let j = 0; j < oldTable[i].length; j += 2) {
        const oldKey = oldTable[i][j];
        const oldValue = oldTable[i][j + 1];
        insert(oldKey, oldValue, newTable);
      }
    }
    oldTable.length = 0;
    this.table = newTable;
  }

  /**
   * Returns all of the keys in the HashMap
   * @returns {Array} An array of keys
   *
   * @example
   * map.put(1, "b");
   * map.put(2, "c");
   * map.put(3, "d");
   * map.keys() // returns ["a", "b", "c"] permutation (order not guarenteed)
   * // but presence is
   */
  keys() {
    const table = this.table;
    const keyArr = [];
    for (let i = 0; i < table.length; i += 1) {
      for (let j = 0; j < table[i].length; j += 2) {
        keyArr.push(table[i][j]);
      }
    }
    return keyArr;
  }

  /**
   * Returns the size of the inner HashTable
   * @returns {number} Size of HashTable
   *
   * @example
   * new Structs.HashMap().tableSize() // 13 initial value empty args
   */
  tableSize() {
    return this.table.length;
  }

  /**
   * Returns number of elements in the HashMap
   * @returns {number} The number of insertions
   *
   * @example
   * const newMap = map.put(99, "problems");
   * newMap.size() // 1
   * newMap.tableSize(); // 13
   */
  size() {
    return this.inserts;
  }
}
module.exports = HashMap;
