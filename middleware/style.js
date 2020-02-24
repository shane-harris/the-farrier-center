'use strict'

const { colorStyle, themes } = require('../scripts/color')
const { valueOr } = require('../scripts/util')

// Middleware that will import 'style' into every EJS file
module.exports = (req, res, next) => {
  const theme = valueOr(req.user, 'Dark')
  res.locals.style = colorStyle(theme)
  res.locals.themes = themes(theme)
  next()
}
