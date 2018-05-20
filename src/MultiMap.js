import RBTree from './RedBlackTree.js';

/**
 * MultiMap representation
 * @class
 * @extends {RBTree}
 * @implements {MultiMapInterface}
 */
class MultiMap extends RBTree {
  constructor(c) {
    super(c);
  }

  put(key, value) {
    const v = super.getVal(key);
    if (v) {
      if (v.indexOf(value) === -1) {
        v.push(value);
      }
    } else {
      super.put(key, [value]);
    }
    return this;
  }

  removeVal(key, value) {
    const vals = super.getVal(key);
    let rem = [];
    if (vals && vals.length > 0) {
      const indexVal = vals.indexOf(value);
      if (indexVal !== -1) {
        rem = vals.splice(indexVal, 1);
      }
    }
    return rem;
  }

  containsEntry(key, value) {
    const vals = super.getVal(key);
    if (vals && vals.length > 0) {
      return vals.indexOf(value) !== -1;
    }
    return false;
  }

  replaceVal(key, oldValue, newValue) {
    const vals = super.getVal(key);
    if (vals && vals.length > 0) {
      const index = vals.indexOf(oldValue);
      if (index !== -1) {
        return vals.splice(index, 1, newValue);
      }
    }
    return [];
  }
}

export default MultiMap;
