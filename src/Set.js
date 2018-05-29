
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
  
  addAll(thatSet){
    let index = 0;
    const thatKeys = thatSet.entries();
    let len = thatKeys.length;
    const add = Set.prototype.add.bind(this);
    while (index < len) {
      add(thatKeys[index]);
      index += 1;
    }
  }
  
  removeAll(thatSet){
    let thatKeys = thatSet.entries();
    let len = thatKeys.length;
    let index = 0;
    const remove = Set.prototype.remove.bind(this);
    while (index < len) {
      remove(thatKeys[index]);
      index += 1;
    }
  }
  
  retainAll(thatSet){
    let index = 0;
    const self = this;
    const thisKeys = self.entries();
    const len = thisKeys.length;
    let data;
    const remove = Set.prototype.remove.bind(this);
    while (index < len) {
      data = thisKeys[index];
      if(!thatSet.has(data)){
       remove(data); 
      }
      index += 1;
    }
  }
}

export default Set;
