class Set {
  constructor() {
    this.set = [];
  }
  
  union($set) {
    //chekck set type
    const thisSet = this.set;
    const thatSet = $set.toArray();
    const unionSet = new Set().add(...thatSet)
    for(let i = 0; i< thatSet.size(); i +=1) {
      let cur = thatSet[i];
      if(unionSet.indexOf(cur) === -1){
        unionSet.add(cur)
      }
    }
    return unionSet;
  }
  
  intersect($set) {
    const thisSet = this.set;
    const thatSet = $set.toArray();
    const crossSet = new Set();
    for(let i = 0; i< thatSet.size(); i += 1) {
      let cur = thatSet[i];
      const bothContain = thisSet.contains(cur) !== -1 && thatSet.contains(cur) !==-1;
      if(bothContain){
        crossSet.add(cur);
      }
    }
    return crossSet;
  }
  
  add(all) {
    //call is array method from base
    const thisSet = this.set;
    if(Array.isArray(all)){
      thisSet.push(...all);
      return this;
    }
    const args = arguments;
    thisSet.push(...args);
    return this;
  }
  removeAny() {
    const thisSet = this.set;
    const randNum = Math.floor(Math.random() * thisSet.length);
    const element = thisSet[randNum];
    return element;
  }
  size() {
    return this.set.length;
  }
  diff($set) {
    const thisSet = this.set;
    const thatSet = $set.toArray();
    const diffSet = new Set();
    for(let i = 0; i< thatSet.size(); i += 1) {
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
    for(let i = 0; i < thisSet.length; i += 1) {
      for(let j = 0; j < thatSet.length; j += 1 ) {
        cartesian.add([[thisSet[i], thatSet[j]]]);
      }
    }
    return cartesian;
  }
  toArray() {
   return Array.from(this.set);
  }

  constains(key) {
    return this.set.indexOf(key) !== -1;
  }
}

const x = new Set()
const y = new Set();
x.add(1, 2, 3)
y.add("a", "b")
console.log(x.product(y))