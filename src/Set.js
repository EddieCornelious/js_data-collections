class Set {
  constructor(args = []) {
    this.set = [...args]
  }
  union($set) {
    const thisSet = this.set;
    const thatSet = $set.toArray();
    const unionSet = new Set().add(thisSet);
    for (let i = 0; i < thatSet.size(); i += 1) {
      let cur = thatSet[i];
      if (unionSet.indexOf(cur) === -1) {
        unionSet.add(cur);
      }
    }
    return unionSet;
  }
  intersect($set) {
    const thisSet = this.set;
    const thatSet = $set.toArray();
    const crossSet = new Set();
    for (let i = 0; i< thatSet.size(); i += 1) {
      let cur = thatSet[i];
      const bothContain = thisSet.contains(cur) !== -1 && thatSet.contains(cur) !==-1;
      if(bothContain){
        crossSet.add(cur);
      }
    }
    return crossSet;
  }
  
  add(e) {
    //call is array method from base
    const thisSet = this.set;
    const args = arguments;
    thisSet.push.apply(thisSet, args);
    return this;
    
  }
  removeAny() {
    const thisSet = this.set;
    const randNum = Math.floor(Math.random() * 2);
    let element ;
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
    for (let i = 0; i< thatSet.size(); i += 1) {
      let cur = thatSet[i];
      const bothContain = thisSet.contains(cur) !== -1 && thatSet.contains(cur) ===-1;
      if (bothContain) {
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
      for (let j = 0; j < thatSet.length; j += 1 ) {
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
