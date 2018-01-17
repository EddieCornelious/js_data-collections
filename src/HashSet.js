import HashMap from './HashMap.js';

/**
 * HashSet representation
 * @class
 * @param {number} [initialCapacity=13] - The initial size of the hashset
 *
 * @example
 * const set = new Collections.HashSet();
 * // FOR ALL EXAMPLES BELOW. ASSUME set IS CLEARED BEFORE EACH EXAMPLE
 */
class HashSet {
  constructor(initialCapacity) {
    this.set = new HashMap(initialCapacity);
  }

  /**
   * Adds an element to the set. Does nothing if already in set
   * @param {*} element - Element to add to the set
   * @returns {boolean} True
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set.add(1);
   * // set contains [1, 2] with no guarenteed order
   */
  add(element) {
    return this.set.put(element);
  }

  /**
   * Updates 'this' with the mathematical set difference of 'this' set and
   * another set
   * @param {HashSet} thatSet - another HashSet instance
   * @returns {undefined}
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set2 = new Structs.HashSet();
   * set2.add(2);
   * set.diff(set2);
   * // set is now [1] and set2 is unchanged
   */
  diff(thatSet) {
    const thatKeys = thatSet.keys();
    const context = this;
    thatKeys.forEach(element => {
      context.remove(element);
    });
  }

  /**
   * Reports whether the set contains a given value
   * @param {*} element - Element to find
   * @returns {boolean} True if set contains @param element and false otherwise
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set.has(3); // false
   */
  has(element) {
    return this.set.contains(element);
  }

  /**
   * Returns all elements in the set
   * @returns {Array} Array with all elements in the set
   */
  keys() {
    return this.set.keys();
  }

  /**
   * Removes an element from the set
   * @returns {boolean} true if @param element was removed and false otherwise
   */
  remove(element) {
    return this.set.remove(element);
  }

  /**
   * Updates 'this' with the mathematical set intersection of 'this' set and
   * another set
   * @param {HashSet} thatSet - another HashSet instance
   * @returns {undefined}
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set2 = new Structs.HashSet();
   * set2.add(2);
   * set.intersect(set2);
   * // set1 is now [2] and set2 is unchanged
   */
  intersect(thatSet) {
    const thisKeys = this.keys();
    const context = this;
    thisKeys.forEach(element => {
      if (!thatSet.has(element)) {
        context.remove(element);
      }
    });
  }

  /**
   * Returns ths size of the set
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set.cardinality() ; // 2
   */
  cardinality() {
    return this.set.size();
  }
}

module.exports = HashSet;
