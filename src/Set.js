function isArray(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
}

class Set {
  constructor(args = []) {
    this.set = [];
    if (!isArray(args)) {
      throw new TypeError('expected type Array');
    }
    args.forEach(element => this.add(element));
  }
  static isSet($set) {
    return $set instanceof Set;
  }
  union($set) {
    const thisSet = this.set;
    const thatSet = $set.toArray();
    const unionSet = new Set([...thisSet]);
    for (let i = 0; i < thatSet.length; i += 1) {
      let cur = thatSet[i];
      unionSet.add(cur);
    }
    return unionSet;
  }
  intersect($set) {
    let thisSet = this.set;
    let thatSet = $set.toArray();
    const crossSet = new Set();
    const combined = thisSet.concat(thatSet);
    for (let i = 0; i < combined.length; i += 1) {
      let cur = combined[i];
      const bothContain = thisSet.indexOf(cur) !== -1 && thatSet.indexOf(cur) !== -1;
      if (bothContain) {
        crossSet.add(cur);
      }
    }
    return crossSet;
  }
  add() {
    // call is array method from base
    const thisSet = this.set;
    const args = arguments;
    for (let i = 0; i < args.length; i += 1) {
      let curArg = args[i];
      if (!this.contains(curArg)) {
        thisSet.push(curArg);
      }
    }
    return this;
  }
  removeAny() {
    if (!this.size() > 0) {
      return;
    }
    const thisSet = this.set;
    const randNum = Math.floor(Math.random() * 2);
    let element;
    if (randNum === 0) {
      element = thisSet.pop();
      return element;
    }
    element = thisSet.shift();
    return element;
  }
  size() {
    return this.set.length;
  }
  diff($set) {
    const thisSet = this.set;
    const thatSet = $set.toArray();
    const diffSet = new Set();
    const combined = thatSet.concat(thisSet);
    for (let i = 0; i < combined.length; i += 1) {
      let cur = combined[i];
      const oneContains = thisSet.indexOf(cur) !== -1 && thatSet.indexOf(cur) === -1;
      if (oneContains) {
        diffSet.add(cur);
      }
    }
    return diffSet;
  }
  product($set) {
    const thisSet = this.set;
    const thatSet = $set.toArray();
    const cartesian = new Set();
    for (let i = 0; i < thisSet.length; i += 1) {
      for (let j = 0; j < thatSet.length; j += 1) {
        cartesian.add([[thisSet[i], thatSet[j]]]);
      }
    }
    return cartesian;
  }
  toArray() {
    return Array.from(this.set);
  }

  contains(key) {
    return this.set.indexOf(key) !== -1;
  }
}
module.exports = Set;
