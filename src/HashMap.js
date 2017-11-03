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

function rehash() {
  const oldTable = this._table;
  this._table = [];
  this._table.length = sieveOfAtkin(oldTable.length * 2);
  this.insert = 0;
  for (let i = 0; i < oldTable.length; i += 1) {
    if (oldTable[i]) {
      for (let j = 0; j < oldTable[i].length; j += 2) {
        this.put(oldTable[i][j], oldTable[i][j + 1]);
      }
    }
  }
}

function fnv(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash *= 0x01000193;
  }
  return hash < 0 ? hash * -1 : hash;
}

class HashMap {
  constructor(initial = 23) {
    this._table = [];
    this._table.length += initial;
    this._loadFactor = 0.75;
    this.insert = 0;
    //TODO : make a key array a red black tree
  }
  // TODO : replace to string with object stringify for objects
  put(key, value) {
    let location = fnv(objToString(key) + '' + typeof key) % this._table.length;
    let table = this._table;
    let bucket = table[location];
    if (!bucket) {
      table[location] = [];
      table[location].push(key, value);
      this.insert += 1;
    } else {
      const keyIndex = bucket.indexOf(key);
      if (keyIndex !== -1) {
        bucket[keyIndex + 1] = value;
      } else {
        bucket.push(key, value);
        this.insert += 1;
      }
    }
    // check if rehashing needs to be done
    if (this.insert / table.length >= 0.75) {
      rehash.call(this);
    }
  }
  // TODO: add indexof polyfill ie<9
  contains(key) {
    let location = fnv(objToString(key) + '' + typeof key) % this._table.length;
    return this._table[location] && this._table[location].indexOf(key) !== -1;
  }

  getVal(key) {
    const table = this._table;
    let location = fnv(objToString(key) + '' + typeof key) % this._table.length;
    const bucket = table[location];
    if (bucket) {
      const keyIndex = bucket.indexOf(key);
      if (keyIndex !== -1) {
        return bucket[keyIndex + 1];
      }
    }
  }
}
module.exports = HashMap;
