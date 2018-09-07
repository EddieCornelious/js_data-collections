import RBTree from './RedBlackTree.js';

/**
 * MultiMap representation
 * @class
 * @implements {MultiMapInterface}
 * @extends {RBTree}
 */
class MultiMap extends RBTree {
  constructor(comparator) {
    super(comparator);
  }

  put(key, value) {
    const foundValues = super.getVal(key);
    if (foundValues) {
      if (foundValues.indexOf(value) === -1) {
        foundValues.push(value);
      }
    } else {
      super.put(key, [value]);
    }
    return this;
  }

  removeVal(key, value) {
    const foundValues = super.getVal(key);
    let removedValue = [];
    if (foundValues && foundValues.length > 0) {
      const indexOfValue = foundValues.indexOf(value);
      if (indexOfValue !== -1) {
        removedValue = foundValues.splice(indexOfValue, 1);
      }
    }
    return removedValue;
  }

  containsEntry(key, value) {
    const foundValues = super.getVal(key);
    if (foundValues && foundValues.length > 0) {
      return foundValues.indexOf(value) !== -1;
    }
    return false;
  }

  replaceVal(key, oldValue, newValue) {
    const foundValues = super.getVal(key);
    if (foundValues && foundValues.length > 0) {
      const index = foundValues.indexOf(oldValue);
      if (index !== -1) {
        return foundValues.splice(index, 1, newValue);
      }
    }
    return [];
  }
}

export default MultiMap;
