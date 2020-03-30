'use strict'

const passport = require('passport')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const url = require('url')
const User = require('../models/user')
const Horse = require('../models/horse')
const { loggedIn, loggedOut } = require('../middleware/auth')

router.use('/public', express.static('public'))

router.get('/', loggedIn, (_, res) => {
  res.redirect('/horse/queue')
})

// Send 204 No Content to avoid a 404 error
router.get('/favicon.ico', (_, res) => res.status(204))

router.post('/register', loggedOut, (req, res, next) => {
  console.log('registering user')
  User.register(
    new User({ username: req.body.username, email: req.body.email }),
    req.body.password,
    err => {
      if (err) {
        console.log('error while user register!', err)
        return next(err)
      }

      console.log('user registered!')

      res.redirect('/login')
    }
  )
})

router.get('/register/:token', loggedOut, (req, res) => {
  jwt.verify(req.params.token, process.env.JWT_KEY, (err, body) => {
    if (err) return res.sendStatus(403)
    req.email = body.email
  })

  res.render('register.ejs', { email: req.email })
})

router.get('/login', loggedOut, (req, res) => {
  res.render('login.ejs', { user: req.user, message: req.flash('error') })
})

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  (_, res) => {
    res.redirect('/')
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/search', loggedIn, async (req, res) => {
  const horses = await Horse.find()
    // sort by id (ascending)
    .sort({ id: 1 })
  res.render('search.ejs', { username: req.user.username, horses: horses })
})

router.post('/search', async (req, res) => {
  try {
    const found = await Horse.findOne({ name: req.body.query })
    res.redirect(`/horse/${found.id}`)
  } catch (_) {
    res.redirect(
      url.format({
        pathname: '/search',
        query: {
          query: req.body.query
        }
      })
    )
    console.log(req.body.query, `Horse '${req.body.query}' not found.`)
  }
})

module.exports = router
