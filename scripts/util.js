'use strict'

const app = require('./app')

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

/**
 * Resolves immediately if the database is already connected. Otherwise waits for the database to
 * connect, then resolves.
 *
 * @example
 * dbConnected().then(() => {
 *   // do something that requires a database connection
 * })
 *
 * @return {Promise}
 */
const dbConnected = () => {
  if (app.get('database-connected')) {
    return Promise.resolve()
  }
  return new Promise(resolve => app.on('event:database-connected', resolve))
}

module.exports = { maybe, dbConnected }
