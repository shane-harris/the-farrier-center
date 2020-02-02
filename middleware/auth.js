'use strict'

const loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

const redirectIfLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

module.exports = { loggedIn, redirectIfLoggedIn }
