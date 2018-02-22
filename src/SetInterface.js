
/**
 * Set Interface
 * @interface
 */
class SetInterface {
  constructor() {
    if(this.constructor.name === "SetInterface") {
      throw new Error("cannot instansiate an interface");
        
    }
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
   * // set contains [1, 2] order might not be guareenteed
   */
  add(element) {
    throw new Error("must implement this method");
  }

  /**
   * Updates 'this' with the mathematical set difference of 'this' set and
   * another set
   * @param {Set} Set - another set instance
   * @returns {undefined}
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set2 = new <Another Set>
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
   * @param {*} element - The element to find
   * @returns {boolean} True if set contains @param element and false otherwise
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set.has(3); // false
   */
   has(element) {
     throw new Error("must implement this method");
   }

  /**
  * Returns all elements in the set
  * @returns {Array} Array with all elements in the set
  */
  keys() {
    throw new Error("must implement this method");
  }

  /**
   * Removes an element from the set
   * @returns {boolean} true if @param element was removed and false otherwise
   */
  remove(element) {
    throw new Error("must implement this method");
  }

  /**
   * Updates 'this' with the mathematical set intersection of 'this' set and
   * another set
   * @param {Set} thatSet - another Set instance
   * @returns {undefined}
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set2 = new Collections.HashSet();
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
    throw new Error("must implement this method");
  }
}

module.exports = SetInterface;
