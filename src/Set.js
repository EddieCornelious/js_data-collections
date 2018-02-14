
import SetInterface from './SetInterface';
import RBTree from './RedBlackTree.js';

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
    return 0;
  }
}

module.exports = Set;
