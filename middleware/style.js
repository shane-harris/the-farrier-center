'use strict'

const { generateStyle, themes } = require('../scripts/style-gen')
const { maybe } = require('../scripts/util')

// Middleware that will import 'style' into every EJS file
module.exports = (req, res, next) => {
  const user = maybe(req.user).or({ theme: 'Dark' })
  const theme = maybe(user.theme).or('Dark')
  res.locals.style = generateStyle(theme)
  res.locals.themes = themes(theme)
  next()
}
