import ArrayUtils from './ArrayUtils.js';
/**
 * Collection of elements that contain no duplicates
 * 
 * @interface
 * 
 */
class SetInterface {
  constructor() {}

  /**
   * Adds an element to the set if already in set
   * @param {*} element - The element to add to the set
   * @returns {Set} The instance that this method was called
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set.add(1);
   * // set contains [1, 2] order might not be guareenteed
   */
  add(element) {}

  /**
   * Returns the set difference (not symmetric) of 'this' set and
   * another set x such that x is in A and x is not in B, where A and B
   * are two sets
   * @param {Set} thatSet - another set instance
   * @returns {Array} The difference of this and @param thatSet
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set2 = new <Another Set>
   * set2.add(2);
   * set.diff(set2); // [1]
   */
  diff(thatSet) {
    const thisKeys = this.entries();
    const result = [];
    const thisLen = thisKeys.length;
    let curElement;
    for (let i = 0; i < thisLen; i += 1) {
      curElement = thisKeys[i];
      if (!thatSet.has(curElement)) {
        result.push(curElement);
      }
    }
    return result;
  }

  /**
   * Returns the mathematical set union of 'this' set and
   * another set
   * @param {Set} thatSet - another set instance
   * @returns {Array} An array containing the union of this and @param thatSet
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set2 = new <Another Set>
   * set2.add(2);
   * set.union(set2); // [1, 2]
   */
  union(thatSet) {
    const thatKeys = thatSet.entries();
    const self = this;
    const thisKeys = self.entries();
    let curElement;
    const thatLen = thatKeys.length;
    for (let i = 0; i < thatLen; i += 1) {
      curElement = thatKeys[i];
      if (!self.has(curElement)) {
        thisKeys.push(curElement);
      }
    }
    return thisKeys;
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
  has(element) {}

  /**
   * Returns all elements in the set
   * @returns {Array} Array with all elements in the set
   */
  entries() {}

  /**
   * Removes an element from the set
   * @returns {Set} the instance that this method was called
   */
  remove(element) {}

  /**
   * Returns the mathematical set intersection of 'this' set and
   * another set
   * @param {Set} thatSet - another Set instance
   * @returns {Array} The array containing the set intersection of this and
   * @param thatSet
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set2 = new Collections.HashSet();
   * set2.add(2);
   * set.intersect(set2); // [2]
   */
  intersect(thatSet) {
    let largerSet, smallerSet;
    const self = this;
    const result = [];
    if (self.cardinality() > thatSet.cardinality()) {
      largerSet = self;
      smallerSet = thatSet.entries();
    } else {
      largerSet = thatSet;
      smallerSet = self.entries();
    }
    const smallLen = smallerSet.length;
    let curElement;
    for (let i = 0; i < smallLen; i += 1) {
      curElement = smallerSet[i];
      if (largerSet.has(curElement)) {
        result.push(curElement);
      }
    }
    return result;
  }

  /**
   * Returns the number of elements in the set
   *
   * @example
   * set.add(1);
   * set.add(2);
   * set.cardinality() ; // 2
   */
  cardinality() {}
}

export default SetInterface;
