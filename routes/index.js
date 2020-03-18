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

router.get('/register/:token', redirectIfLoggedIn, (req, res) => {
  jwt.verify(req.params.token, process.env.JWT_KEY, (err, body) => {
    if (err) return res.sendStatus(403)
    req.email = body.email
  })

  res.render('register.ejs', { email: req.email })
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
})

router.get('/autocomplete', loggedIn, (req, res) => {
  var regex = new RegExp(req.query["term"], 'i');

  var horseFilter = Horse.find({ name: regex }, { 'name': 1 })
    .sort({ "updated_at": -1 })
    .sort({ "created_at": -1 })
    .limit(20);

  horseFilter.exec(function (err, data) {
    //data is all horse names that match query
    var result = [];
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(horse => {
          let obj = { //turn each horse name and id pair into an opject
            id: horse._id, //dont know why horse.id returns undefined but _id works
            label: horse.name
          };
          result.push(obj);
        });
      }
      //return all the results to autocomplete.js
      res.jsonp(result);
    }
  });
})

module.exports = router
