import HashMap from './HashMap.js';
class HashMultiMap extends HashMap {
  constructor(size) {
    super(size);
  }
  put(key, value) {
    const retVal = super.getVal(key);
    if (retVal) {
      if (retVal.indexOf(value) === -1) {
        return retVal.push(value);
      }
    } else {
      const newValArr = [];
      newValArr.push(value);
      return super.put(key, newValArr);
    }
    return true;
  }
  getVal(key) {
    return super.getVal(key);
  }
}

export default HashMultiMap;
