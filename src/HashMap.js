// modified code https://en.wikipedia.org/wiki/Sieve_of_Atkin#Pseudocode
function sieveOfAtkin(limit) {
  let toReturn = [];
  if (limit > 2) { toReturn.push(2); }
  if (limit > 3) { toReturn.push(3); }

  // Initialise the sieve array with false values
  let sieve = new Array(limit);
  for (let i = 0; i < limit; i += 1) {
    sieve[i] = false;
  }
  for (let x = 1; x * x < limit; x += 1) {
    for (let y = 1; y * y < limit; y += 1) {
      // Main part of Sieve of Atkin
      let n = (4 * x * x) + (y * y);
      if (n <= limit && (n % 12 === 1 || n % 12 === 5)) {
        sieve[n] ^= true;
      }
      n = (3 * x * x) + (y * y);
      if (n <= limit && n % 12 === 7) {
        sieve[n] ^= true;
      }
      n = (3 * x * x) - (y * y);
      if (x > y && n <= limit && n % 12 === 11) {
        sieve[n] ^= true;
      }
    }
  }

  // Mark all multiples of squares as non-prime
  for (let r = 5; r * r < limit; r += 1) {
    if (sieve[r]) {
      for (let i = r * r; i < limit; i += r * r) {
        sieve[i] = false;
      }
    }
  }
  for (let a = 5; a < limit; a += 1) {
    if (sieve[a]) {
      toReturn.push(a);
    }
  }
  return toReturn[toReturn.length - 1];
}
// TODO: put this in seperate file and make accessible to all
function objToString(obj) {
  const toStr = obj.toString();
  if (toStr === '[object Object]') {
    return JSON.stringify(obj);
  }
  return toStr;
}
function createTable(size){
  const table = []
  for(let i = 0; i < size; i++){
    table.push([]);
  }
  return table;
}
function fnv(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash *= 0x01000193;
  }
  return hash < 0 ? hash * -1 : hash;
}

function searchBucket(bucket, item){
  return bucket.indexOf(item);
}
function insertKey(bucket, key, value){
   for(let i=0; i<bucket.length; i++){
      let inBucket = searchBucket(bucket[i], key);
      if(inBucket === 0){
        bucket[i][1] = value;
        return;
      }
    }
    bucket.push([key, value]);
}
//retrieve val from inner
function retVal(bucket, key){
  for(let i=0; i<bucket.length; i++){
    let inBucket = searchBucket(bucket[i], key)
    if(inBucket === 0){
      return bucket[i][1];
    }
  }
  return;
}

class HashMap {
  constructor(initial = 23) {
    this._table = createTable(initial)
    this._loadFactor = 0.75;
    this.insert = 0;
  }
  // TODO : replace to string with object stringify for objects
  put(key, value) {
    let location = fnv(objToString(key) + '' + typeof key) % this._table.length;
    let table = this._table;
    let bucket = table[location];
    insertKey(bucket, key, value)
    this.insert+= 1;
    // check if rehashing needs to be done
    if (this.insert / table.length >= 0.75) {
      this.rehash();
    }
  }
  rehash(){
    const oldTable = this._table;
    const oldKeys = this.getKeys();
    const newTable = createTable(sieveOfAtkin(oldTable.length*2))
    for(let i=0; i<oldKeys.length; i++){
      let key = oldKeys[i];
      let location = fnv(objToString(key) + '' + typeof key) % newTable.length;
      let bucket = newTable[location];
      insertKey(bucket, key, this.getVal(key)); 
    }
    this._table = newTable;
    return
  }
  // TODO: add indexof polyfill ie<9
  contains(key) {
    let location = fnv(objToString(key) + '' + typeof key) % this._table.length;
    const bucket = this._table[location]
    return retVal(bucket, key) !== undefined;
  }

  getVal(key) {
    const table = this._table;
    let location = fnv(objToString(key) + '' + typeof key) % table.length;
    const bucket = table[location];
    return retVal(bucket, key)
    
  }
  tableSize(){
    return this._table.length;
  }
  size() {
    return this.insert;
  }

  getKeys() {
    function notEmpty(ele){
      return ele.length > 0
    }
    const k = []
    const filtered = this._table.filter(notEmpty)
    for(let i=0; i<filtered.length; i++){
       for(let j=0; j<filtered[i].length; j++){
       k.push(filtered[i][j][0])
      }
    }
    return k;
  }
}
module.exports = HashMap;
