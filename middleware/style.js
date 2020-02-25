'use strict'

const { generateStyle, themes } = require('../scripts/style-gen')
const { valueOr } = require('../scripts/util')

// Middleware that will import 'style' into every EJS file
module.exports = (req, res, next) => {
  const user = valueOr(req.user, { theme: 'Dark' })
  const theme = valueOr(user.theme, 'Dark')
  res.locals.style = generateStyle(theme)
  res.locals.themes = themes(theme)
  next()
}
