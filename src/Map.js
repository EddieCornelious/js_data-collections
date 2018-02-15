
import MapInterface from "./MapInterface.js";
import RBTree from "./RedBlackTree.js";

/**
 * Map representaion
 * @class
 * @implements MapInterface
 * @param {function} comparator - @see Global#defaultComparator
 */
class Map extends MapInterface {
  constructor(comparator) {
    super();
    this.map = new RBTree(comparator);  
  }

  put(key, value) {
    return this.map.insert(key, value);
  }

  getVal(key) {
    return this.map.find(key);
  }

  remove(key) {
    return this.map.remove(key);
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