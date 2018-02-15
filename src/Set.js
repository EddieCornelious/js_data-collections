
import SetInterface from './SetInterface';
import RBTree from './RedBlackTree.js';

/**
 * Set representaion
 * @class
 * @implements SetInterface
 * @param {function} comparator - @see Global#defaultComparator
 */
class Set extends SetInterface {
  constructor(comparator) {
    super();
    this.set = new RBTree(comparator);
  }

  add(element) {
    return this.set.insert(element);
  }

  has(element) {
    return this.set.contains(element);
  }

  remove(element) {
    return this.set.remove(element);
  }

  cardinality() {
    return this.set.size();
  }
}

module.exports = Set;
