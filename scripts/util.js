'use strict'

/**
 * Passes through `value` if it exists, or `deflt` if it is undefined.
 *
 * @param {*} value A value that may be undefined
 * @param {*} deflt The default value to use if `value` is undefined
 */
const valueOr = (value, deflt) => (value !== undefined ? value : deflt)

module.exports = { valueOr }
