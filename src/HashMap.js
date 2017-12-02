
function fnv(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash *= 0x01000193;
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
function insert(k, v, table) {
  let hash = fnv(JSON.stringify(k) + typeof k);
  let location = mod(hash, table.length);
  let bucket = table[location];
  return bucket.push(k, v);
}
function search(k) {
  const { table } = this;
  let toStr = JSON.stringify(k);
  let hash = fnv(toStr + typeof k);
  let location = mod(hash, table.length);
  let bucket = table[location];
  for (let i = 0; i < bucket.length; i += 2) {
    if (Object.is(k, bucket[i])) {
      return { bucket, i };
    }
  }
  return { bucket: undefined, i: -1 };
}
class HashMap {
  constructor(size = 13) {
    this.inserts = 0;
    this.table = createTable(size);
  }
  put(k, v) {
    if (this.contains(k)) {
      return false;
    }
    const { table } = this;
    insert(k, v, table);
    this.inserts += 1;
    if ((this.inserts / this.table.length) >= 0.75) {
      this.rehash();
    }
    return true;
  }
  getVal(k) {
    if (!this.contains(k)) {
      return;
    }
    const searchRes = search.call(this, k);
    const { bucket, i } = searchRes;
    return bucket[i + 1];
  }
  remove(k) {
    if (!this.contains(k)) {
      return;
    }
    const searchRes = search.call(this, k);
    const { bucket, i } = searchRes;
    bucket.splice(i, 1);
    bucket.splice(i, 1);
    this.inserts -= 1;
  }
  contains(k) {
    const searchRes = search.call(this, k);
    const { i } = searchRes;
    return i !== -1;
  }
  rehash() {
    const oldTable = this.table;
    const newTable = createTable(oldTable.length * 2);
    for (let i = 0; i < oldTable.length; i += 1) {
      while (oldTable[i].length > 0) {
        let v = oldTable[i].pop();
        let k = oldTable[i].pop();
        insert(k, v, newTable);
      }
    }
    this.table = newTable;
  }
  update(k, newVal) {
    if (!this.contains(k)) {
      return;
    }
    const searchRes = search.call(this, k);
    const { bucket, i } = searchRes;
    bucket[i + 1] = newVal;
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
