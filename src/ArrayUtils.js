import swap from './Util.js';

function pushValToArray(val) {
  const arr = [];
  arr.push(val);
  return arr;
}
function genRand(limit) {
  return Math.floor(Math.random() * limit);
}

function lRotate(arr, time) {
  let rotations = time;
  while (rotations < 0) {
    let top = arr.shift();
    arr.push(top);
    rotations += 1;
  }
}
function rRotate(arr, time) {
  let rotations = time;
  while (rotations > 0) {
    let top = arr.pop();
    arr.unshift(top);
    rotations -= 1;
  }
}

class ArrayUtils {
  constructor() {} // eslint-disable-line no-empty-function
  static remove(arr = [], i = 0) {
    return i >= 0 ? arr.splice(i, 1) : [];
  }
  static removeObj(arr = 0, obj = '0') {
    let index = arr.indexOf(obj);
    return ArrayUtils.remove(index);
  }
  static rotate(arr, times) {
    if (times < 0) {
      return lRotate(arr, times);
    }
    return rRotate(arr, times);
  }
  static popMany(arr, times) {
    const diff = this.length - times;
    if (diff < 0) {
      return [];
    }
    return this.slice(0, diff);
  }
  static pushMany(arr, toPush) { // eslint-disable-line no-unused-vars
    let args = [...arguments];
    // throw out array arg
    args.shift();
    return arr.concat(args);
  }
  static getRand(arr) {
    return Math.floor(1 + (Math.random() * arr.length));
  }
  static removeRand(arr) {
    const rand = genRand(arr.length);
    return ArrayUtils.remove(rand);
  }
  static shuffle(arr) {
    const len = arr.length;
    for (let i = 0; i < Math.floor(len / 2); i += 1) {
      let index1 = genRand(len);
      let index2 = genRand(len);
      swap(arr, index1, index2);
    }
  }
  static flatten(arr) {
    let newArr = [];
    let cur;
    for (let i = 0; i < arr.length; i += 1) {
      cur = arr[i];
      newArr = Array.isArray(cur)
        ? newArr.concat(ArrayUtils.flatten(cur))
        : newArr.concat(pushValToArray(cur));
    }
    return newArr;
  }
}
module.exports = ArrayUtils;

