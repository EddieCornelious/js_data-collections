/**
 * Map Interface
 * @interface
 */
class MapInterface {
  constructor() {}

  /**
   * Inserts the given key and value into the Map
   * @param {*} key - The key
   * @param {*} value - The value mapped to by @param key
   * @returns {Map} The instance that this method was called
   *
   * @example
   * map.put("ed", "jones");
   * // ed maps to jones
   * map.put("ed", "james");
   * // now same ed maps to james and not jones
   */
  put(key, value) {}

  /**
   * Retrieves the value mapped to by the given key
   * @param {*} key - The key to lookup
   * @returns {*} The value associated with @param key
   *
   * @example
   * map.put(99, "problems");
   * map.getVal(99); // returns "problems"
   */
  getVal(key) {}

  /**
   * Removes the given key and its associated value from the Map
   * @param {*} key - The key to lookup
   * @returns {boolean} True if the key and it's value were removed and false otherwise
   *
   * @example
   * map.put(99, "problems");
   * map.remove(88); // returns false
   * map.remove(99); // returns true
   */
  remove(key) {}

  /**
   * Reports whether the Map contains the given key
   * @param {*} key - The key to lookup
   * @returns {boolean} True if @param key is found and false otherwise
   *
   * @example
   * map.contains("empty"); // return false
   */
  contains(key) {}

  /**
   * Returns all of the keys in the Map
   * @returns {Array} An array of keys
   *
   * @example
   * map.put(1, "b");
   * map.put(2, "c");
   * map.put(3, "d");
   * map.keys() // returns [1, 2, 3] permutation (order may
   * or may not be guarenteed)
   */
  keys() {}

  /**
   * Returns all of the values in the Map
   * @returns {Array} An array of values
   *
   * @example
   * map.put(1, "b");
   * map.put(2, "c");
   * map.put(3, "d");
   * map.values() // returns ["c", "b", "d"] permutation
   */
  values() {}

  /**
   * Returns number of elements in the Map
   * @returns {number} The number of insertions
   *
   * @example
   * map.put(99, "problems");
   * map.size() // 1
   */
  size() {}

  /**
   * Clears the map of all k,v pairs
   * @returns {undefined}
   */
  clear() {}
}

export default MapInterface;
