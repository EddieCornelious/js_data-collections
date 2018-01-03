import { swap, isNumber } from './Util.js';

function pushValToArray(val) {
  const arr = [];
  arr.push(val);
  return arr;
}
function genRand(limit) {
  return Math.floor(Math.random() * limit);
}

function lRotate(arr, times) {
  let rotations = times;
  let top;
  const len = arr.length;
  while (rotations < 0 && len) {
    top = arr.shift();
    arr.push(top);
    rotations += 1;
  }
}
function rRotate(arr, times) {
  let rotations = times;
  let top;
  const len = arr.length;
  while (rotations > 0 && len) {
    top = arr.pop();
    arr.unshift(top);
    rotations -= 1;
  }
}

class ArrayUtils {
  constructor() {} // eslint-disable-line no-empty-function
  static remove(arr = [], i = 1) {
    return i >= 0 ? arr.splice(i, 1) : [];
  }
  static removeObj(arr = [], obj) {
    const index = arr.indexOf(obj);
    return ArrayUtils.remove(arr, index);
  }
  static rotate(arr = [], times = 0) {
    isNumber(times);
    if (times < 0) {
      return lRotate(arr, times);
    }
    return rRotate(arr, times);
  }
  static popMany(arr = [], times = 0) {
    const diff = arr.length - times;
    return diff > 0 ? arr.slice(0, diff) : [];
  }
  static pushMany(arr = []) { // eslint-disable-line no-unused-vars
    const args = [...arguments];
    // throw out array arg
    args.shift();
    return arr.concat(args);
  }
  static getRand(arr) {
    return arr[genRand(arr.length)];
  }
  static removeRand(arr) {
    const rand = genRand(arr.length);
    return ArrayUtils.remove(arr, rand);
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
  static chunk(arr, bits) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += bits) {
      newArr.push(arr.slice(i, i + bits));
    }
    return newArr;
  }
}
module.exports = ArrayUtils;

