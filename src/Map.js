
import MapInterface from './MapInterface.js';
import RBTree from './RedBlackTree.js';

/**
 * Map representaion
 * @class
 * @implements MapInterface
 * @param {function} comparator - @see Global#defaultComparator
 *
 * @example
 * const map = new Collections.Map();
 */
class Map extends MapInterface {
  constructor(comparator) {
    super();
    this.map = new RBTree(comparator);
  }

  put(key, value) {
    this.map.insert(key, value);
    return this;
  }

  getVal(key) {
    return this.map.find(key);
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

  /**
   * Returns the smallest key in the Map
   * @returns {*} The smallest key
   */
  floorKey() {
    return this.map.min();
  }

  /**
   * Returns the largest key in the Map
   * @returns {*} The largest key
   */
  ceilKey() {
    return this.map.max();
  }

  /**
   * Returns all keys less than the given value
   * @param {*} value - The upper bound
   * @returns {Array} Array of keys smaller than @param value
   */
  lowerThan(value) {
    return this.map.keysLess(value);
  }

  /**
   * Returns all keys greater than the given value
   * @param {*} value - The lower bound
   * @returns {Array} Array of keys larger than @param value
   */
  higherThan(value) {
    return this.map.keysGreater(value);
  }
}

export default Map;
