function fnv(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash *= 0x01000193;
  }
  return hash;
}

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

function dj(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash;
}
function createTable(size) {
  const newTable = [];
  for (let i = 0; i < size; i++) {
    newTable.push([]);
  }
  return newTable;
}

function mod(a, b) {
  const modulo = a % b;
  if (modulo < 0) {
    return modulo + b;
  }
  return modulo;
}
class HashMap {
  constructor(size = 23) {
    this.table = createTable(size);
    this.insert =0;
  }
  put(key, value) {
    if(this.contains(key)){
      return;
    }
    const { table } = this;
    const hash1 = fnv(JSON.stringify(key));
    const hash2 = dj(JSON.stringify(key));
    const location1 = mod(hash1, table.length);
    const location2 = mod(hash2, table.length);
    let bucket1 = table[location1];
    let bucket2 = table[location2];
    this.insert += 1;
    if (bucket1.length <= bucket2.length) {
      bucket1.push(key, value);
    } else {
      bucket2.push(key, value);
    }
    if(this.insert / table.length > 0.70){
      this.rehash()
    }
  }
  rehash(){
    const oldTable = this.table;
    const newTable = createTable(sieveOfAtkin(oldTable.length * 2));
    const oldKeys = this.keys(); 
    for(let i=0; i<oldKeys.length; i++){
      let key = oldKeys[i]
      const hash1 = fnv(JSON.stringify(key));
      const hash2 = dj(JSON.stringify(key));
      const location1 = mod(hash1, newTable.length);
      const location2 = mod(hash2, newTable.length);
      let bucket1 = newTable[location1];
      let bucket2 = newTable[location2];
      if(bucket1.length <= bucket2.length){
        bucket1.push(key, this.getVal(key))
      }
      else {
        bucket2.push(key, this.getVal(key));
      }
    }
    this.table = newTable;
  }
  getVal(key){
    const { table } = this;
    const hash1 = fnv(JSON.stringify(key));
    const hash2 = dj(JSON.stringify(key));
    const location1 = mod(hash1, table.length);
    const location2 = mod(hash2, table.length);
    let bucket1 = table[location1];
    let bucket2 = table[location2];
    let index1 = bucket1.indexOf(key)
    let index2 = bucket2.indexOf(key)
    
    if(index1 % 2 === 0){
      return bucket1[index1 + 1];
    }
    else if(index2 % 2 ===0){
      return bucket2[index2 + 1]
    } 
  }
  keys(){
    function notEmpty(bucket){
      return bucket.length > 0;
    }
    const k = []
    const filledBuckets = this.table.filter(notEmpty);
    for(let i =0; i< filledBuckets.length; i++){
      for(let j =0; j< filledBuckets[i].length; j+=2){
        k.push(filledBuckets[i][j]);
      }
    }
    
    return k;
  }
  contains(key){
    const { table } = this;
    const hash1 = fnv(JSON.stringify(key));
    const hash2 = dj(JSON.stringify(key));
    const location1 = mod(hash1, table.length);
    const location2 = mod(hash2, table.length);
    let bucket1 = table[location1];
    let bucket2 = table[location2];
    return (bucket1.indexOf(key) % 2 === 0) || (bucket2.indexOf(key) % 2 === 0);
  }
  size(){
    return this.insert;
  }
  tableSize(){
    return this.table.length;
  }
}

module.exports = HashMap;
