'use strict'

// Middleware that will import 'style' into every EJS file
module.exports = (_, res, next) => {
  res.locals.style = require('../scripts/color')
  next()
}
