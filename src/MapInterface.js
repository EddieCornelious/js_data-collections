
/**
 * Map Interface
 * @interface
 */
class MapInterface {
  constructor() {
    if(this.constructor.name === "MapInterface") {
      throw new Error("cannot instansiate an interface");
        
    }
  }

  /**
   * Inserts the given key and value into the Map
   * @param {*} key - The key
   * @param {*} value - The value mapped to by @param key
   * @returns {boolean} True
   *
   * @example
   * map.put("ed", "jones");
   * // ed maps to jones
   * map.put("ed", "james");
   * // now same ed maps to james and not jones
   */
  put(key, value) {
    throw new Error("must implement this method");
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
    throw new Error("must implement this method");  
  }
  
  
  /**
   * Removes the given key and its associated value from the Map
   * @param {*} key - The key to lookup
   * @returns {boolean} True if the key was removed and false otherwise
   *
   * @example
   * map.put(99, "problems");
   * map.remove(88); // returns false
   * map.remove(99); // return true
   */
   remove(key) {
     throw new Error("must implement this method"); 
   }

  /**
   * Reports whether the Map contains the given key
   * @param {*} key - The key to lookup
   * @returns {boolean} True if @param key is found and false otherwise
   *
   * @example
   * map.contains("empty"); // return false
   */
   contains(key) {
    throw new Error("must implement this method"); 
   }

   /**
   * Returns all of the keys in the Map
   * @returns {Array} An array of keys
   *
   * @example
   * map.put(1, "b");
   * map.put(2, "c");
   * map.put(3, "d");
   * map.keys() // returns ["a", "b", "c"] permutation (order may 
   * or may not be guarenteed)
   */
   keys() {
     throw new Error("must implement this method");   
   }
   
   /**
   * Returns number of elements in the Map
   * @returns {number} The number of insertions
   *
   * @example
   * map.put(99, "problems");
   * map.size() // 1
   */
   size() {
     throw new Error("must implement this method"); 
   }
}

module.exports = MapInterface;
