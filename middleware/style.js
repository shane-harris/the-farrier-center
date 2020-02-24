'use strict'

const { generateStyle, themes } = require('../scripts/style-gen')

// Middleware that will import 'style' into every EJS file
module.exports = (req, res, next) => {
  const theme = req.user !== undefined ? req.user.theme : 'Dark'
  res.locals.style = generateStyle(theme)
  res.locals.themes = themes(theme)
  next()
}
