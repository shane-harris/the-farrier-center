'use strict'

/**
 * Returns `value` if it exists, or `defaultValue` if it is undefined.
 *
 * Example:
 * const val = maybe(mightBeUndefined).or(defaultVal)
 *
 * @param {*} value A value that might be undefined
 * @param {*} defaultValue The value to return if `value` is undefined
 * @returns `value` if it is not undefined, or `defaultValue` if it is.
 */
const maybe = value => ({
  or: defaultValue => (value !== undefined ? value : defaultValue)
})

module.exports = { maybe }
