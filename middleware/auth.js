var User = require('../models/user')

var middlewareObj = {}

middlewareObj.loggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

middlewareObj.redirectIfLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/')
  }
  return next()
}

module.exports = middlewareObj
