// from immutable.js implementation of java hashcode
// https://github.com/facebook/immutable-js/blob/master/src/Hash.js
// better distribution than fnv TODO: change fnv name
function hashStr(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = ((31 * hash) + str.charCodeAt(i)) | 0;
  }
  return hash;
}
function mod(a, b) {
  const modulo = a % b;
  if (a < 0) {
    return modulo * -1;
  }
  return modulo;
}
function createTable(size) {
  const newTable = [];
  for (let i = 0; i < size; i += 1) {
    newTable.push([]);
  }
  return newTable;
}
function toString(obj) {
  const type = typeof obj;
  if (type === 'string' || type === 'number') {
    return obj.toString();
  } else if (type === 'boolean' || type === 'function') {
    return obj.toString();
  }
  return JSON.stringify(obj);
}
function insert(k, v, table) {
  let hash = hashStr(toString(k) + typeof k);
  let location = mod(hash, table.length);
  let bucket = table[location];
  return bucket.push(k, v);
}
function search(k, table) {
  let toStr = toString(k);
  let hash = hashStr(toStr + typeof k);
  let location = mod(hash, table.length);
  let bucket = table[location];
  for (let index = 0; index < bucket.length; index += 2) {
    if (k === bucket[index]) {
      return { bucket, index };
    }
  }
  return { bucket: undefined, index: -1 };
}
function shouldRehash(inserts, table) {
  if ((inserts / table.length) >= 0.75) {
    return true;
  }
}

class HashMap {
  constructor(size = 13) {
    this.inserts = 0;
    this.table = createTable(size);
  }
  put(key = null, value = null) {
    const { table, inserts } = this;
    const searchRes = search(key, table);
    const { bucket, index } = searchRes;
    if (index === -1) {
      insert(key, value, table);
      this.inserts += 1;
      if (shouldRehash(inserts + 1, table)) {
        this.rehash();
      }
    } else {
      bucket[index + 1] = value;
    }
    return true;
  }
  getVal(key) {
    const searchRes = search(key, this.table);
    const { bucket, index } = searchRes;
    return index !== -1 ? bucket[index + 1] : undefined;
  }
  remove(key) {
    const searchRes = search(key, this.table);
    const { bucket, index } = searchRes;
    if (index !== -1) {
      bucket.splice(index, 2);
      this.inserts -= 1;
      return true;
    }
    return false;
  }
  contains(key) {
    return this.getVal(key) !== undefined;
  }
  rehash() {
    const oldTable = this.table;
    const newTable = createTable(oldTable.length * 2);
    for (let i = 0; i < oldTable.length; i += 1) {
      for (let j = 0; j < oldTable[i].length; j += 2) {
        let oldKey = oldTable[i][j];
        let oldValue = oldTable[i][j + 1];
        insert(oldKey, oldValue, newTable);
      }
    }
    this.table.length = 0;
    this.table = newTable;
  }
  keys() {
    const table = this.table;
    const keyArr = [];
    for (let i = 0; i < table.length; i += 1) {
      for (let j = 0; j < table[i].length; j += 2) {
        keyArr.push(table[i][j]);
      }
    }
    return keyArr;
  }
  tableSize() {
    return this.table.length;
  }
  size() {
    return this.inserts;
  }
}
module.exports = HashMap;
