import {swap, generateRandomInt, flat} from './Util.js';

/**
 * Various utility methods that can be used on arrays
 * @class
 * @static
 *
 * @example
 * const arrayMethods = Collections.ArrayUtils;
 */
class ArrayUtils {
  // eslint-disable-next-line no-empty-function
  constructor() {}

  /**
   * Removes the element at the given position in the given array
   * @static
   * @param {Array} array - The array to remove elements from
   * @param {number} [index=0] - The index to remove from @param array
   * @returns {Array} Array of removed elements
   *
   * @example
   * const myArray = [1, 2, 3, 4];
   * let removedItems = arrayMethods.remove(myArray, 1);
   * // removedItems contains [2] and myArray is [1, 3, 4]
   */
  static remove(array = [], index = 0) {
    return index >= 0 ? array.splice(index, 1) : [];
  }

  /**
   * Removes the first occurence of the given value from the array
   * @static
   * @param {Array} array - The array to remove elements from
   * @param {function} predicate - The function used to compare values
   * @returns {Array} Array of removed elements
   *
   * @example
   * const myArray = [1, 2, 3, 4];
   * let removedItems = arrayMethods.removeElement(myArray, 3);
   * // changedArray contains [3] and myArray is [1, 2, 4]
   */
  static removeElement(array = [], predicate) {
    const indexToRemove = ArrayUtils.findIndex(array, predicate);
    return ArrayUtils.remove(array, indexToRemove);
  }

  /**
   * Rotates the given array left(negative number) or right(positive number)
   * @static
   * @param {Array} array - The array to rotate
   * @param {number} [times=0] - The number of times to rotate @param array
   * @throws {TypeError} If @param times is not a primitive number
   * @returns {Array} A new Array with rotations applied
   *
   * @example
   * const myArray = [1, 2, 3, 4];
   * let B = arrayMethods.rotate(myArray, 2);
   * // myArray is [1, 2, 3, 4]
   * // B is [3, 4, 1, 2]
   * B = arrayMethods.rotate(B, -2);
   * // B is back to original positioning of myArray [1, 2, 3, 4]
   */
  static rotate(array = [], times = 0) {
    const len = array.length;
    if (times > 0) {
      const upperBound = len - times;
      return array.slice(upperBound).concat(array.slice(0, upperBound));
    }
    const timesToPositiveInt = Math.abs(times);
    return array.slice(timesToPositiveInt).concat(array.slice(0, timesToPositiveInt));
  }

  /**
   * Removes the last element from the given array
   * @static
   * @param {Array} array - The array to pop
   * @param {number} [times=0] - The number of times to pop @param array
   * @returns {Array} A new array equal to
   * [@param array - popped elements]
   *
   * @example
   * const myArray = [1, 2, 3, 4];
   * const altered = arrayMethods.popMany(myArray, 3);
   * // myArray is [1, 2, 3, 4] ; altered is [1]
   */
  static popMany(array = [], times = 0) {
    const upperBound = array.length - times;
    return upperBound > 0 ? array.slice(0, upperBound) : [];
  }

  /**
   * Adds elements to the end of the given array
   * @static
   * @param {Array} [array=empty array] - The array to push elements into
   * @param {*} args - Consecutive arguments to push into array
   * @returns {Array} A new array equal to [@param array + pushed elements]
   *
   * @example
   * const myArray = [1, 2];
   * const altered = arrayMethods.pushMany(myArray, "push", "me");
   * // myArray is unchanged ; altered = [1, 2, "push", "me"]
   */
  static pushMany(array = [], ...args) {
    return array.concat(args);
  }

  /**
   * Removes the first element from the given array
   * @static
   * @param {Array} array - The array to shift
   * @param {number} [times=0] - The number of times to shift @param array
   * @returns {Array} A new array equal to
   * [@param array - shifted elements]
   *
   * @example
   * const myArray = [1, 2, 3, 4];
   * const altered = arrayMethods.shiftMany(myArray, 3);
   * // myArray is [1, 2, 3, 4] ; altered is [4]
   */
  static shiftMany(array = [], times = 0) {
    return times > 0 ? array.slice(times) : array;
  }

  /**
   * Adds elements to the front of the given array
   * @static
   * @param {Array} [array=empty array] - The array to add elements into
   * @param {*} args - Consecutive arguments to push into array
   * @returns {Array} A new array equal to
   * [unshifted elements + @param array ]
   *
   * @example
   * const myArray = [1, 2, 3, 4];
   * const altered = arrayMethods.unshiftMany(myArray, "hi");
   * // myArray is [1, 2, 3, 4] ; altered is ["hi", 1, 2, 3, 4]
   */
  static unshiftMany(array = [], ...args) {
    return args.concat(array);
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
    const randomIndex = generateRandomInt(array.length);
    return array[randomIndex];
  }

  /**
   * Removes a random element from the given array
   * @static
   * @param {Array} array - The array to remove a random element from
   * @returns {Array} An array of length 1 containing the element removed
   * from @param array
   *
   * @example
   * const myArray = [1, 2];
   * const altered = arrayMethods.removeRand(myArray);
   * // altered could be 1 or 2 ; myArray's length decreases by 1
   */
  static removeRand(array = []) {
    const randomIndex = generateRandomInt(array.length);
    return ArrayUtils.remove(array, randomIndex);
  }

  /**
   * Shuffles the given array
   * @static
   * @param {Array} array - The array to shuffle
   * @returns {undefined}
   */
  static shuffle(array = []) {
    const arrayLength = array.length;
    for (let i = arrayLength - 1; i > 0; i -= 1) {
      const randomIndex = generateRandomInt(i + 1);
      swap(array, randomIndex, i);
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
    const res = [];
    flat(array, res);
    return res;
  }

  /**
   * Splits the given array into chunks
   * @param {Array} array - The array to chunk
   * @param {number} [bits=0] - The size of each nested array
   * @throws {TypeError} If @param bits is not a primitive number
   * @returns {Array} A new array split into @param bits
   *
   * @example
   * const myArray = [1, 2, 3, 4];
   * const altered = arrayMethods.chunk(myArray, 2);
   * // altered is [[1, 2], [3, 4]] ; myArray is unchanged
   */
  static chunk(array = [], bits = 0) {
    const newArr = [];
    if (bits <= 0) {
      return newArr;
    }
    for (let i = 0, len = array.length; i < len; i += bits) {
      const newChunk = array.slice(i, i + bits);
      newArr.push(newChunk);
    }
    return newArr;
  }

  /**
   * Finds the first occurrence in the given array where a given callback evaluates to truthy
   * @param {Array} array - The array to search through
   * @param {function(curElement, index)} callback - The function used to evaluate each element
   * @returns {number|undefined} The element @callback is truthy or undefined if none passed
   */
  static find(array, callback) {
    const len = array.length;
    let index = 0;
    while (index < len) {
      const data = array[index];
      if (callback(data, index)) {
        return data;
      }
      index += 1;
    }
  }

  /**
   * Finds the index in the given array that passes the given testing function
   * @param {Array} array - The array to search through
   * @param {function(curElement, index)} callback - The function used to evaluate each element
   * @returns {number} The index where @callback is truthy or -1 if none passed
   */
  static findIndex(array, callback) {
    const len = array.length;
    let index = 0;
    while (index < len) {
      if (callback(array[index], index)) {
        return index;
      }
      index += 1;
    }
    return -1;
  }

  /**
   * Returns a new array with elements that give non-truthy values for the given testing function
   * @param {Array} array - The array to filter
   * @param {function(curElement, index)} callback - The function used to evaluate each element
   * @returns {Array} A new Array filled wit only elements that did not pass the test
   */
  static filterNot(array, callback) {
    const len = array.length;
    const res = [];
    let index = 0;
    while (index < len) {
      const data = array[index];
      if (!callback(data, index)) {
        res.push(data);
      }
      index += 1;
    }
    return res;
  }

  /**
   * Returns a new Array with elements mapped only if they pass a testing function first
   * @param {Array} array - The array to map to another array
   * @param {function(curElement, index)} test - The testing function
   * @param {function(curElement, index)} mapper - The mappping function
   * @return {Array} A new Array with mapped elements that pass the @param test
   */
  static mapIf(array, test, mapper) {
    const len = array.length;
    let index = 0;
    const res = [];
    while (index < len) {
      const data = array[index];
      if (test(data, index)) {
        const mappedElement = mapper(data, index);
        res.push(mappedElement);
      }
      index += 1;
    }
    return res;
  }
}
export default ArrayUtils;
