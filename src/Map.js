
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

  remove(key) {
    this.map.remove(key);
    return this;
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

module.exports = Map;
