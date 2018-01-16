import { swap, isNumber, genRand } from './Util.js';

/**
 * Pushes a value to an array and returns the new array
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
 * Rotates array elements to the lefta fixed number of times
 * @private
 * @param {Array} array - The array to rotate
 * @param {number} times - The number of times to rotate left
 * @returns {undefined}
 */
function lRotate(array, times) {
  let rotations = times;
  let front;
  if (array.length > 1) {
    while (rotations < 0) {
      front = array.shift();
      array.push(front);
      rotations += 1;
    }
  }
}

/**
 * Rotates array elements to the right
 * @private
 * @param {Array} array - The array to rotate
 * @param {number} times -The number of times to rotate right
 * @returns {undefined}
 */
function rRotate(array, times) {
  let rotations = times;
  let back;
  if (array.length > 1) {
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
 *
 * @example
 * const arrayMethods = Structs.ArrayUtils;
 */
class ArrayUtils {
  constructor() {} // eslint-disable-line no-empty-function

  /**
   * Removes an element at the given position in the given array
   * @static
   * @param {Array} array - The array to remove elements from
   * @param {number} index - The index to remove from @param array
   * @returns {Array} Array of elements removed
   *
   * @example
   * const myArray = [1, 2, 3, 4];
   * let removedItems = arrayMethods.remove(myArray, 1);
   * // removedItems contains [2] and myArray is [1, 3, 4]
   */
  static remove(array = [], index = 1) {
    return index >= 0 ? array.splice(index, 1) : [];
  }

  /**
   * Removes the first occurence of the given value from array
   * @static
   * @param {Array} array - The array to remove elements from
   * @param {*} value - The value to remove from @param array
   * @returns {Array} Array of removed elements
   *
   * @example
   * const myArray = [1, 2, 3, 4];
   * let removedItems = arrayMethods.removeElement(myArray, 3);
   * // changedArray contains [3] and myArray is [1, 2, 4]
   */
  static removeElement(array = [], value) {
    const indexOfValue = array.indexOf(value);
    return ArrayUtils.remove(array, indexOfValue);
  }

  /**
   * Rotates the given array left(negative number) or right(positive number)
   * @static
   * @param {Array} array - The array to rotate
   * @param {number} times - The number of times to rotate @param array
   * @throws {TypeError} If @param times is not a primitive number
   * @returns {undefined}
   *
   * @example
   * const myArray = [1, 2, 3, 4];
   * arrayMethods.rotate(myArray, 2);
   * // myArray is [3, 4, 1, 2]
   * arrayMethods.rotate(myArray, -2);
   * // myArray is back to original positioning [1, 2, 3, 4]
   */
  static rotate(array = [], times = 0) {
    // avoid infinite loop is rotate methods
    isNumber(times);
    if (times < 0) {
      return lRotate(array, times);
    } else if(times > 0) {
      return rRotate(array, times);
    }
  }

  /**
   * Pops the given array a given amount of times
   * @static
   * @param {Array} array - The array to pop
   * @param {number} times - The number of times to pop @param array
   * @returns {Array} A new array equal to
   * [@param array - popped elements]
   *
   * @example
   * const myArray = [1, 2, 3, 4];
   * const altered = arrayMethods.popMany(myArray, 3);
   * // myArray is [1, 2, 3, 4] ; altered is [1]
   */
  static popMany(array = [], times = 0) {
    const diff = array.length - times;
    return diff > 0 ? array.slice(0, diff) : [];
  }

  /**
   * Pushes many elements into the given array
   * @static
   * @param {Array} array - The array to push elements into
   * @param {*} args - Consecutive arguments to push into array
   * @returns {Array} A new array equal to [@param array + pushed elements]
   *
   * @example
   * const myArray = [1, 2];
   * const altered = arrayMethods.pushMany(myArray, "push", "me");
   * // myArray is unchanged ; altered = [1, 2, "push", "me"]
   */
  static pushMany(array = []) { // eslint-disable-line no-unused-vars
    const args = [...arguments];
    // throw out array arg
    args.shift();
    return array.concat(args);
  }

  /**
   * Returns a random index in the given array
   * @static
   * @param {Array} array - The array to get random index from
   * @returns {*} Random element in @param array
   *
   * @example
   * const myArray = [1, 2];
   * const altered = arrayMethods.getRand(myArray);
   * // altered could be 1 or 2
   */
  static getRand(array = []) {
    return array[genRand(array.length)];
  }

  /**
   * Removes a random element from the given array
   * @static
   * @param {Array} array - The array to remove random element from
   * @returns {Array} An array of length 1 containing the element removed
   * from @param array
   *
   * @example
   * const myArray = [1, 2];
   * const altered = arrayMethods.removeRand(myArray);
   * // altered could be 1 or 2 ; myArray's length decreases by 1
   */
  static removeRand(array = []) {
    const randIndex = genRand(array.length);
    return ArrayUtils.remove(array, randIndex);
  }

  /**
   * Shuffles the given array
   * @static
   * @param {Array} array - The array to shuffle
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
   * @param {Array} array - The array to flatten
   * @returns {Array} @param array to a one dimensional array
   *
   * @example
   * const myArray = [[2], [3], [4, 5]];
   * const altered = arrayMethods.flatten(myArray);
   * // altered will be [2, 3, 4, 5] ; myArray is unchanged
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
   * Splits the given array into chunks
   * @param {Array} array - The array to chunk
   * @returns {Array} A new array split into @param bits
   *
   * @exmaple
   * const myArray = [1, 2, 3, 4];
   * const altered = arrayMethods.chunk(myArray, 2);
   * // altered is [[1, 2], [3, 4]] ; myArray is unchanged
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

