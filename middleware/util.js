'use strict'

const { valueOr } = require('../scripts/util')

module.exports = (_, res, next) => {
  res.locals.valueOr = valueOr
  next()
}
