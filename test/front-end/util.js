'use strict'

/**
 * When called inside of a `before` block, skips all tests in the current `describe` block.
 *
 * @example
 * describe('Some tests', () => {
 *   // IMPORTANT: You must use 'function' syntax to have access to 'this'
 *   before(function() {
 *     skipIfDisabled(this)
 *   })
 * })
 *
 * @param {*} that `this` from the `before` block
 */
const skipIfDisabled = that => {
  if (process.env.TEST_FRONT_END === 'false') {
    that.skip()
  }
}

/**
 * Calls `f` if the front-end tests are disabled
 *
 * @param {Function} f
 * @returns {Promise}
 */
const ifDisabled = f => {
  if (process.env.TEST_FRONT_END === 'false') {
    f()
  }
  return Promise.resolve()
}

/**
 * Calls `f` if the front-end tests are enabled
 *
 * @param {Function} f
 * @returns {Promise} A promise resolving to the return value of `f`
 */
const ifEnabled = f => {
  if (process.env.TEST_FRONT_END !== 'false') {
    f()
  }
  return Promise.resolve()
}

module.exports = { skipIfDisabled, ifDisabled, ifEnabled }
