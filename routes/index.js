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
  console.log("Res from search...............................................", req.url.normalize())
  let pureQuery = req.url.replace("/search?query=", "");
  pureQuery = pureQuery.replace("%20", " ") //Remove the special character correction later
  pureQuery = pureQuery.replace("%2C%20", ", ")
  pureQuery = pureQuery.replace("%20", " ")
  let test = req.param.query
  console.log("Hope this works", test)
  console.log("Pure query...", pureQuery)

  let horses = await Horse.find({ name: pureQuery })
    // sort by id (ascending)
    .sort({ id: 1 })

  if (horses.length === 0) {
    horses = await Horse.find({ owner: pureQuery })
      .sort({ id: 1 })
  }
  res.render('search.ejs', { username: req.user.username, horses: horses })

})

router.post('/search', async (req, res) => {
  try {
    const howMany = await Horse.find({ name: req.body.query })
    const howManyOwners = await Horse.find({ owner: req.body.query })
    console.log("How many have same name", howMany.length)

    console.log("How many...", howMany)
    console.log(howMany[0].id)
    if (howMany.length === 1) {
      res.redirect(`/horse/${howMany[0].id}`)
    }
    else {
      res.redirect(
        url.format({
          pathname: '/search',
          query: {
            query: req.body.query
          }
        })
      )
      //console.log(req.body.query, `Horse '${req.body.query}' not found.`)
    }

    //const found = await Horse.findOne({ name: req.body.query })
    //res.redirect(`/horse/${found.id}`)
  } catch (_) {
    res.redirect(
      url.format({
        pathname: '/search',
        query: {
          query: req.body.query
        }
      })
    )
    //console.log(req.body.query, `Horse '${req.body.query}' not found.`)
  }
})

router.get('/autocomplete', loggedIn, (req, res) => {
  const regex = new RegExp(req.query["term"], 'i');
  //var horseOwner = new RegExp(req.query["term"], 'i');
  const finalResult = [];
  var horseFilter = Horse.find({ name: regex }, { 'name': 1 })
    .sort({ "updated_at": -1 })
    .sort({ "created_at": -1 })
    .limit(100)

  var horseOwner = Horse.find({ name: regex }, { 'owner': 1 })
    .sort({ "updated_at": -1 })
    .sort({ "created_at": -1 })
    .limit(100)

  horseFilter.exec(function (err, data) {
    //data is all horse names that match query
    var result = [];
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(horse => {
          console.log("data within horse", horse);
          let obj = { //turn each horse name and id pair into an opject
            id: horse._id, //dont know why horse.id returns undefined but _id works
            label: horse.name,
          };
          result.push(obj);
          finalResult.push(result)
        });
      }
      //return all the results to autocomplete.js
      res.jsonp(result);
    }
  });

  horseOwner.exec(function (err, data) {
    //data is all horse names that match query
    var result = [];
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(horse => {
          console.log("data within horse", horse);
          let obj = { //turn each horse name and id pair into an opject
            id: horse._id, //dont know why horse.id returns undefined but _id works
            label: horse.owner,
          };
          result.push(obj);
          finalResult.push(result)
        });
      }
      //return all the results to autocomplete.js
      //res.jsonp(finalResult);
    }
  });
  //res.jsonp(result);
})

module.exports = router
