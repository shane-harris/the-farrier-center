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

function isAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    return next()
  } else {
    res.redirect('/queue')
  }
}

module.exports = { loggedIn, redirectIfLoggedIn, isAdmin }
