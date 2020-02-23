'use strict'

const passport = require('passport')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const url = require('url')
const User = require('../models/user')
const Horse = require('../models/horse')
const { loggedIn, redirectIfLoggedIn } = require('../middleware/auth')

router.use('/public', express.static('public'))

router.get('/', loggedIn, (req, res) => {
  res.redirect('/horse/queue')
})

router.post('/register', redirectIfLoggedIn, (req, res, next) => {
  console.log('registering user')
  User.register(new User({ username: req.body.username }), req.body.password, err => {
    if (err) {
      console.log('error while user register!', err)
      return next(err)
    }

    console.log('user registered!')

    res.redirect('/login')
  })
})

router.get('/register/:token', redirectIfLoggedIn, (req, res) => {
  jwt.verify(req.params.token, process.env.JWT_KEY, (err, email) => {
    if (err) return res.sendStatus(403)
    req.email = email
  })

  res.render('register.ejs', {})
})

router.get('/login', redirectIfLoggedIn, (req, res) => {
  res.render('login.ejs', { user: req.user, message: req.flash('error') })
})

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    res.redirect('/')
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/search', loggedIn, (req, res) => {
  Horse.find()
    // sort by id (ascending)
    .sort({ id: 1 })
    .then(horses => res.render('search.ejs', { username: req.user.username, horses: horses }))
    .catch(console.error)
  console.log(req.body, 'Im in GET')
})

router.post('/search', (req, res) => {
  var query = req.body.query
  Horse.findOne({ name: query })
    .then(found => {
      res.redirect(
        url.format({
          pathname: `/horse/${found.id}`
        })
      )
    })
    .catch(err => {
      res.redirect(
        url.format({
          pathname: '/search',
          query: req.body.query
        })
      )
    })
  console.log(req.body.query, 'Horse Not found')
})

module.exports = router
