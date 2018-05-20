
import SetInterface from './SetInterface';
import RBTree from './RedBlackTree.js';

/**
 * Set representaion
 * @class
 * @implements {SetInterface}
 * @param {function} comparator - @see Global#defaultComparator
 *
 * @example
 * const set = new Collections.Set();
 */
class Set extends SetInterface {
  constructor(comparator) {
    super();
    this.set = new RBTree(comparator);
  }

  add(element) {
    this.set.put(element, 1);
    return this;
  }

  has(element) {
    return this.set.contains(element);
  }

  remove(element) {
    return this.set.remove(element);
  }

  entries() {
    return this.set.keys();
  }

  cardinality() {
    return this.set.size();
  }

  min() {
    return this.map.min();
  }

  max() {
    return this.map.max();
  }

  union(thatSet) {
    return super.union(thatSet);
  }

  intersect(thatSet) {
    return super.intersect(thatSet);
  }

  diff(thatSet) {
    return super.diff(thatSet);
  }
}

export default Set;
