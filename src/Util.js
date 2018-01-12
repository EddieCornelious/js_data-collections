
/**
 * swap method for Structs BHeap and Array
 * @private
 * @param {Array} array - array to swap certain elements
 * @param {number} index1 - index to swap with @param index2
 * @param {number} index2 - index to swap with @param index1
 * @returns {undefined}
 */
function swap(array, index1, index2) {
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
function toString(value) {
  const type = typeof value;
  if (type === 'string') {
    return value;
  } else if (type === 'number' || type === 'boolean' || type === 'function') {
    return value.toString();
  }
  return JSON.stringify(value);
}

/**
 * default comparator for all Structs
 * @callback defaultComparator
 * @param {(number|string)} a - first element to compare
 * @param {(number|string)} a - second element to compare
 * @returns {number} -1 if a < b, 1 if a > b, and 0 if equal
 */
function defaultComp(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}

/**
 * Number.isNaN polyfill from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
 * /Global_Objects/Number/isFinite
 * @private
 */
function isNumber(value) {
  if (typeof value !== 'number'
  || !isFinite(value)) { // eslint-disable-line no-restricted-globals
    throw new TypeError('Argument must be of type number or Number');
  }
}

module.exports = {
  swap,
  defaultComp,
  isNumber,
  toString
};
