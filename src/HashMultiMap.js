import HashMap from './HashMap.js';

/**
 * HashMultiMap representation
 * @class
 * @extends HashMap
 * @param {number} [initialCapacity=13] - Initial size of the hashmultimap
 * @inheritdoc
 * @example
 * const map = new Structs.HashMultiMap();
 * // FOR ALL EXAMPLES BELOW. ASSUME map IS CLEARED BEFORE EACH EXAMPLE
 */
class HashMultiMap extends HashMap {
  constructor(initialCapacity) {
    super(initialCapacity);
  }

  /**
   * Inserts given key and value into HashMultiMap
   * @param {*} key - Key value
   * @param {*} value - Value mapped to by @param key
   * @returns {boolean} True
   *
   * @example
   * map.put("ed", "jones");
   * map.put("ed", "james");
   * // ed now maps to jones and james.
   */
  put(key, value = null) {
    const retVal = super.getVal(key);
    if (retVal) {
      // no duplicate values for one key
      if (retVal.indexOf(value) === -1) {
        return retVal.push(value);
      }
      return false;
    }
    const newValArr = [];
    newValArr.push(value);
    return super.put(key, newValArr);
  }
}

module.exports = HashMultiMap;
