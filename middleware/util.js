'use strict'

const { maybe } = require('../scripts/util')

module.exports = (_, res, next) => {
  res.locals.maybe = maybe
  next()
}
