'use strict'

const { colorStyle, themes } = require('../scripts/color')

// Middleware that will import 'style' into every EJS file
module.exports = (req, res, next) => {
  const theme = req.user !== undefined ? req.user.theme : 'Dark'
  res.locals.style = colorStyle(theme)
  res.locals.themes = themes(theme)
  next()
}
