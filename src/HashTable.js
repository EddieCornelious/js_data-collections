import { toString } from './Util.js';
import MapInterface from './MapInterface.js';

/**
 * From immutable.js implementation of java hashcode
 * https://github.com/facebook/immutable-js/blob/master/src/Hash.js
 *
 * Returns the hashcode for the given string
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
  return dividend < 0 ? modulo * -1 : modulo;
}

/**
 * Creates a 2 dimensional array of the given size
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
 * Gets the proper index the given key should be hashed to in the given array
 * @private
 * @param {*} key - The key
 * @param {Array} Associative Array
 * @returns {number} The index that @param key hashes to
 */
function getLocation(key, table) {
  const hash = hashStr(toString(key) + typeof key);
  return mod(hash, table.length);
}

/**
 * Inserts into an Associative Array based on the hashcode of the given key
 * @private
 * @param {*} key - The key
 * @param {*} value - The value mapped to by @param key
 * @param {Array} table - Associative Array
 * @returns {number} 1 for true
 */
function insert(key, value, table) {
  const location = getLocation(key, table);
  const bucket = table[location];
  return bucket.push(key, value);
}

/**
 * Searches an Associative Array based on the hashcode of the given key
 * @private
 * @param {*} key - The key to look for
 * @param {Array} table - Associative Array
 * @returns {Object} Object literal with the bucket where @param key is found
 * and the index of @param key in that bucket or undefined and -1 if not found
 */
function search(key, table) {
  const location = getLocation(key, table);
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
 * Figures out if the given Associative Array should grow larger
 * @private
 * @param {number} inserts - The number of items in the table
 * @param {Array} table - Associative Array
 * @returns {boolean} True if @param table should rehash and false otherwise
 */
function shouldRehash(inserts, table) {
  const load = (inserts / table.length);
  return load >= 0.75 ? true : false;
}

/**
 * HashTable representation
 * @class
 * @private
 * @implements MapInterface
 * @param {number} [initialCapacity=13] - Initial size of the hashtable
 * IMPORTANT : It is not recommended that you choose a size that will be a
 * close or approximate upper bound on your data, so that number
 * of rehashes of the hashtable will be small. For example, if
 * you know you only need 100,000 inserts, a good initial capacity would not be
 * approximately 100,000 as the hastable will resize once 75,000
 * (75% of size) to 75,000 * 2 = 150,000. Next resize will be 0.75 * 150,000
 * which is 112,500 , greater than your space needed.
 */
class HashTable extends MapInterface {
  constructor(initialCapacity = 13) {
    super();
    this.inserts = 0;
    this.table = createTable(initialCapacity);
  }

  put(key = null, value = null) {
    const self = this;
    const { table, inserts } = self;
    const searchRes = search(key, table);
    const { bucket, index } = searchRes;
    if (index === -1) {
      insert(key, value, table);
      self.inserts += 1;
      if (shouldRehash(inserts + 1, table)) {
        self.rehash();
      }
    } else {
      bucket[index + 1] = value;
    }
    return self;
  }

  getVal(key) {
    const searchRes = search(key, this.table);
    const { bucket, index } = searchRes;
    return index !== -1 ? bucket[index + 1] : undefined;
  }

  remove(key) {
    const self = this;
    const searchRes = search(key, self.table);
    const { bucket, index } = searchRes;
    if (index !== -1) {
      self.inserts -= 1;
      return bucket.splice(index, 2)[1];
    }
  }

  contains(key) {
    return this.getVal(key) !== undefined;
  }

  /**
   * Resizes (2x) and rehashes all keys in HashTable
   * @returns {undefined}
   */
  rehash() {
    const oldTable = this.table;
    const newTable = createTable(oldTable.length * 2);
    const oldLen = oldTable.length;

    for (let i = 0; i < oldLen; i += 1) {
      const currentBucket = oldTable[i];
      for (let j = 0; j < currentBucket.length; j += 2) {
        const oldKey = currentBucket[j];
        const oldValue = currentBucket[j + 1];
        insert(oldKey, oldValue, newTable);
      }
    }
    oldTable.length = 0;
    this.table = newTable;
  }

  keys() {
    const table = this.table;
    const keyArr = [];
    const tableLen = table.length;
    for (let i = 0; i < tableLen; i += 1) {
      const currentBucket = table[i];
      for (let j = 0; j < currentBucket.length; j += 2) {
        keyArr.push(currentBucket[j]);
      }
    }
    return keyArr;
  }

  values() {
    const table = this.table;
    const valArr = [];
    const tableLen = table.length;
    for (let i = 0; i < tableLen; i += 1) {
      const currentBucket = table[i];
      for (let j = 1; j < currentBucket.length; j += 2) {
        valArr.push(currentBucket[j]);
      }
    }
    return valArr;
  }

  /**
   * Returns the number of buckets in the Associative Array
   * @returns {number} Size of inner Associative Array
   */
  tableSize() {
    return this.table.length;
  }

  clear() {
    const self = this;
    self.table.length = 0;
    self.table = createTable(13);
  }

  size() {
    return this.inserts;
  }
}
export default HashTable;
