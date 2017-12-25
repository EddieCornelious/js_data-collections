const HashMap = require('./HashMap.js');
class HashSet {
  constructor() {
    this.set = new HashMap();
  }
  add(k) {
    return this.set.put(k, null);
  }
  diff(thatSet) {
    const thatKeys = thatSet.keys();
    const context = this;
    thatKeys.forEach(function func(k) {
      context.remove(k);
    });
  }
  has(k) {
    return this.set.contains(k);
  }
  keys() {
    return this.set.keys();
  }
  remove(k) {
    return this.set.remove(k);
  }
  intersect(thatSet) {
    const thisKeys = this.keys();
    const context = this;
    thisKeys.forEach(function func(k) {
      if (!thatSet.has(k)) {
        context.remove(k);
      }
    });
  }
  cardinality() {
    return this.set.size();
  }
}

module.exports = HashSet;
