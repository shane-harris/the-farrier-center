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
  let pureQuery = req.url.replace('/search?query=', '')
  //Removing URL special characters
  pureQuery = pureQuery.replace(/%20/g, ' ')
  pureQuery = pureQuery.replace(/%2C/g, ',')

  let horses = await Horse.find({ name: pureQuery }).sort({ id: 1 })

  if (horses.length === 0) {
    horses = await Horse.find({ owner: pureQuery }).sort({ id: 1 })

    if (horses.length === 0) {
      horses = await Horse.find({ location: pureQuery }).sort({ id: 1 })

      /*No horses found via current query.
      Search for all matches that begin with query*/
      if (horses.length === 0) {
        var pattern = pureQuery.replace(pureQuery, "^" + pureQuery + ".*")
        horses = await Horse.find({ name: { $regex: pattern, $options: "i" } })
      }
    }
  }
  res.render('search.ejs', { username: req.user.username, horses: horses })
})

router.post('/search', async (req, res) => {
  const howMany = await Horse.find({ name: req.body.query })
  const howManyOwners = await Horse.find({ owner: req.body.query })

  if (howMany.length === 1) {
    res.redirect(`/horse/${howMany[0].id}`)
  } else {
    res.redirect(
      url.format({
        pathname: '/search',
        query: {
          query: req.body.query
        }
      })
    )
  }
})

router.get('/autocomplete', loggedIn, (req, res) => {
  const regex = new RegExp(req.query['term'], 'i')
  const fullResult = []

  var horseName = Horse.find({ name: regex }, { name: 1 })
    .sort({ updated_at: -1 })
    .sort({ created_at: -1 })
    .limit(30)

  var horseOwner = Horse.find({ owner: regex }, { owner: 1 })
    .sort({ updated_at: -1 })
    .sort({ created_at: -1 })
    .limit(30)

  var horseLocation = Horse.find({ location: regex }, { location: 1 })
    .sort({ updated_at: -1 })
    .sort({ created_at: -1 })
    .limit(30)

  horseName.exec(function (err, data) {
    //data is all horse names that match query
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(horse => {
          let obj = {
            //turn each horse name and id pair into an opject
            id: horse._id, //dont know why horse.id returns undefined but _id works
            label: horse.name
          }
          fullResult.push(obj)
        })
      }
    }
  })

  horseOwner.exec(function (err, data) {
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(horse => {
          let obj = {
            id: horse._id,
            label: horse.owner
          }
          fullResult.push(obj)
        })
      }
    }
  })

  horseLocation.exec(function (err, data) {
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(horse => {
          let obj = {
            id: horse._id,
            label: horse.location
          }
          fullResult.push(obj)
        })
      }

      var finished = false
      var duplicate = false
      var result = []
      //Removing duplicate results from full result array
      while (!finished) {
        for (var i = 0; i < fullResult.length; i++) {
          for (var j = 0; j < result.length; j++) {
            if (result[j].label == fullResult[i].label) {
              duplicate = true
            }
          }
          if (!duplicate) {
            result.push(fullResult[i])
          }
          duplicate = false
        }
        finished = true
      }
      if (finished) res.jsonp(result)
    }
  })
})

module.exports = router
