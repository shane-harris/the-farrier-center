'use strict'

const navColor = '#42240c'

function style() {
  return `
  :root {
    --nav-color: ${navColor}
  }
  `
}

// Middleware that will import 'style' into every EJS file
function importStyle(req, res, next) {
  res.locals.style = style
  next()
}

module.exports = importStyle
