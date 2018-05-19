
/**
 * swap method for Structs BHeap and Array
 * @private
 * @param {Array} array - array to swap certain elements
 * @param {number} index1 - index to swap with @param index2
 * @param {number} index2 - index to swap with @param index1
 * @returns {undefined}
 */
export function swap(array, index1, index2) {
  const oldIndex1 = array[index1];
  array[index1] = array[index2];
  array[index2] = oldIndex1;
}

/**
 * Converts a given value to a string
 * @private
 * @param {*} value - The value to convert to a string
 * @returns {string} @param value to string or stringified by JSON
 */
export function toString(value) {
  const type = typeof value;
  if (type === 'string') {
    return value;
  } else if (type === 'number' || type === 'boolean' || type === 'function') {
    return value.toString();
  }
  return JSON.stringify(value);
}

/**
 * default comparator for all Collections
 * @function defaultComparator
 * @param {(number|string)} a - first element to compare
 * @param {(number|string)} b - second element to compare
 * @returns {number} -1 if a < b, 1 if a > b, and 0 if equal
 *
 * @example
 * function(a, b) {
   if(a < b) {
     return -1;
   } else if(a > b) {
     return 1;
   }
   return 0;
 }
 */
export function defaultComp(a, b) {
  if (a < b) {
    return -1;
  }
  if (a === b) {
    return 0;
  }
  return 1;
}

/**
 * Custom comparator example for all Collections
 * @function customComparator
 * @param {*} a - first element to compare
 * @param {*} b - second element to compare
 * @returns {number} -1 if a < b, 1 if a > b, and 0 if equal
 *
 * @example
 * // suppose data is of the form { age : 2 } , { age : 12 }....etc
 * function(a, b) {
   if(a.age < b.age) {
     return -1;
   } else if(a.age > b.age) {
     return 1;
   }
   return 0;
 }
 */
function customComp(a, b) { // eslint-disable-line no-unused-vars
  if (a < b) {
    return -1;
  }
  if (a === b) {
    return 0;
  }
  return 1;
}

/**
 * Number.isNaN polyfill from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
 * /Global_Objects/Number/isFinite
 * @private
 */
export function isNumber(value) {
  if (typeof value !== 'number'
  || !isFinite(value)) { // eslint-disable-line no-restricted-globals
    throw new TypeError('Argument must be of type number or Number');
  }
}

/**
 * Generates a random integer between 0 and limit (exclusive)
 * @private
 * @param {number} limit - Upper bound on random number
 * @returns {number} Random number in the range [0, @param limit)
 */
export function genRand(limit) {
  return Math.floor(Math.random() * limit);
}

module.exports = {
  swap,
  defaultComp,
  isNumber,
  toString,
  genRand
};
