/**
 * Maps one key to multiple values but does not contain duplicate kv pairs
 * @extends MapInterface
 *
 */
class MultiMapInterface {
  constructor() {}

  /**
   * Maps the given value to the given key. Does not add duplicate values
   * @param {*} key - The key to map to the given value
   * @param {*} value - The value mapped to by @param key
   * @returns {MultiMap} The instance this method was called with
   */
  put(key, value) {}

  /**
   * Removes the value associated with the given key
   * @param {*} key - The key to remove the value from
   * @param {*} value - The value
   * @returns {Array} The removed value of an empty array if not found
   */
  removeVal(key, value) {}

  /**
   * Reports whether the multimap contains the given entry
   * @param {*} key - The key
   * @param {*} value - The value
   * @returns {boolean} True if @param key is mapped to @param value
   */
  containsEntry(key, value) {}

  /**
   * Replaces the given value mapped to by the given key
   * @param {*} key - The key
   * @param {*} oldValue - The oldValue
   * @param {*} newValue - The updated value
   */
  replaceVal(key, oldValue, newValue) {}
}
