'use strict'

const { colorStyle, themes } = require('../scripts/color')

// Middleware that will import 'style' into every EJS file
module.exports = (req, res, next) => {
  res.locals.style = colorStyle(req.user.theme)
  res.locals.themes = themes(req.user.theme)
  next()
}
