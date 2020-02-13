'use strict'

const color = require('../scripts/color')

// Middleware that will import 'style' into every EJS file
module.exports = (req, res, next) => {
  res.locals.style = color(req.user.theme)
  next()
}
