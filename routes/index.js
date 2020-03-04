'use strict'

const passport = require('passport')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const url = require('url')
const User = require('../models/user')
const Horse = require('../models/horse')
const { search } = require('../models/search')
const { loggedIn, redirectIfLoggedIn } = require('../middleware/auth')

router.use('/public', express.static('public'))

router.get('/', loggedIn, (req, res) => {
  res.redirect('/horse/queue')
})

// Send 204 No Content to avoid a 404 error
router.get('/favicon.ico', (_, res) => res.status(204))

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
  search();
})

router.get('/autocomplete', (req, res) => {
  var regex = new RegExp(req.body.query["term"], 'i');
  var query = Horse.find({ fullname: regex }, { 'name': 1 }).limit(20);

  query.exec(function (err, users) {
    if (!err) {
      // Method to construct the json result set
      //var result = buildResultSet(users);
      res.send(users, {
        'Content-Type': 'application/json'
      }, 200);
    } else {
      res.send(JSON.stringify(err), {
        'Content-Type': 'application/json'
      }, 404);
    }
  });
})

/*router.post('/search', (req, res) => {
  Horse.findOne({ name: req.body.query })
    .then(found => res.redirect(`/horse/${found.id}`))
    .catch(_ =>
      res.redirect(
        url.format({
          pathname: '/search',
          query: {
            query: req.body.query
          }
        })
      )
    )
  console.log(req.body.query, 'Horse Not found')
})*/

router.get('/autocomplete', loggedIn, (req, res) => { })
module.exports = router
