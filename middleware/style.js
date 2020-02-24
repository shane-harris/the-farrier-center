'use strict'

const { generateStyle, themes } = require('../scripts/style-gen')
const { valueOr } = require('../scripts/util')

// Middleware that will import 'style' into every EJS file
module.exports = (req, res, next) => {
  const theme = valueOr(req.user, 'Dark')
  res.locals.style = generateStyle(theme)
  res.locals.themes = themes(theme)
  next()
}
