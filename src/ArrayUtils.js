import { swap, isNumber } from './Util.js';

/**
 * Pushes a value to an array
 * @private
 * @param {*} value - The value to push to array
 * @returns {Array} Array of length one with @param value in it
 */
function pushValToArray(value) {
  const array = [];
  array.push(value);
  return array;
}

/**
 * Generates a random number integer between 0 and limit (exclusive)
 * @param {number} limit - Upper bound on random number
 * @returns {number} Random number in the range [0, @param number)
 */
function genRand(limit) {
  return Math.floor(Math.random() * limit);
}

/**
 * Rotates array elements to the left
 * @param {Array} array - Array to rotate
 * @param {number} times - Number of times to rotate
 * @returns {undefined}
 */
function lRotate(array, times) {
  let rotations = times;
  let front;
  if (array.length > 0) {
    while (rotations < 0) {
      front = array.shift();
      array.push(front);
      rotations += 1;
    }
  }
}
/**
 * Rotates array elements to the right
 * @param {Array} array - Array to rotate
 * @param {number} times - Number of times to rotate
 * @returns {undefined}
 */
function rRotate(array, times) {
  let rotations = times;
  let back;
  if (array.length > 0) {
    while (rotations > 0) {
      back = array.pop();
      array.unshift(back);
      rotations -= 1;
    }
  }
}
/**
 * Various utility methods that can be called with arrays
 * @class
 * @static
 */
class ArrayUtils {
  constructor() {} // eslint-disable-line no-empty-function

  /**
   * Removes the element at a given position
   * @static
   * @param {Array} array - An array to remove elements from
   * @param {number} index - Index of element to remove
   * @returns {Array} Array of elements removed
   */
  static remove(array = [], index = 1) {
    return index >= 0 ? array.splice(index, 1) : [];
  }

  /**
   * Removes a given value from array
   * @static
   * @param {Array} array - An array to remove elements from
   * @param {*} value - value to remove from @param array
   * @returns {Array} Array of removed elements
   */
  static removeObj(array = [], value) {
    const index = array.indexOf(value);
    return ArrayUtils.remove(array, index);
  }

  /**
   * Rotates an array left(negative number) right(positive number)
   * @static
   * @param {Array} array - Array to rotate
   * @param {number} times - Number of times to rotate @param array
   * @returns {undefined}
   */
  static rotate(array = [], times = 0) {
    isNumber(times);
    if (times < 0) {
      return lRotate(array, times);
    }
    return rRotate(array, times);
  }

  /**
   * Pops an array several times
   * @static
   * @param {Array} array - Array to pop
   * @param {number} times - Number of times to pop @param array
   * @returns {Array} A new array A new array equal to
   * [@param array - popped elements]
   */
  static popMany(array = [], times = 0) {
    const diff = array.length - times;
    return diff > 0 ? array.slice(0, diff) : [];
  }

  /**
   * Pushes many elemnts into an array
   * @static
   * @param {Array} array - Array to push onto
   * @param {number} times - Number of times to pop @param array
   * @returns {Array} A new array equal to [@param array + new elements]
   */
  static pushMany(array = []) { // eslint-disable-line no-unused-vars
    const args = [...arguments];
    // throw out array arg
    args.shift();
    return array.concat(args);
  }

  /**
   * Returns a random index in a array
   * @static
   * @param {Array} array - Array to get random index from
   * @returns {*} Random index in @param array
   */
  static getRand(array = []) {
    return array[genRand(array.length)];
  }

  /**
   * Removes a random element from an array
   * @static
   * @param {Array} array - Array to remove random element from
   * @returns {Array} array - Array of elements removed from @param array
   */
  static removeRand(array = []) {
    const rand = genRand(array.length);
    return ArrayUtils.remove(array, rand);
  }

  /**
   * Shuffles the given array
   * @static
   * @param {Array} array - Array to shuffle
   * @returns {undefined}
   */
  static shuffle(array) {
    const arrayLength = array.length;
    for (let i = 0; i < Math.floor(arrayLength / 2); i += 1) {
      let index1 = genRand(arrayLength);
      let index2 = genRand(arrayLength);
      swap(array, index1, index2);
    }
  }

  /**
   * Turns an n dimensional array into a 1 dimensional array
   * @param {Array} array - Array to flatten
   * @returns {Array} The flattened array
   */
  static flatten(array) {
    let newArr = [];
    let curValue;
    for (let i = 0; i < array.length; i += 1) {
      curValue = array[i];
      newArr = Array.isArray(curValue)
        ? newArr.concat(ArrayUtils.flatten(curValue))
        : newArr.concat(pushValToArray(curValue));
    }
    return newArr;
  }

  /**
   * Splits an array into chunks
   * @param {Array} array - Array to chunk
   * @returns {Array} A new array with split into @param bits
   */
  static chunk(arr, bits) {
    const newArr = [];
    if (bits <= 0) {
      return [];
    }
    for (let i = 0; i < arr.length; i += bits) {
      newArr.push(arr.slice(i, i + bits));
    }
    return newArr;
  }
}
module.exports = ArrayUtils;

