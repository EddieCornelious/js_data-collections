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
 * default comparator for all Structs
 * @private
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

module.exports = { swap, defaultComp };
