'use strict'

const passport = require('passport')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const url = require('url')
const User = require('../models/user')
const Horse = require('../models/horse')
const { loggedIn, loggedOut } = require('../middleware/auth')
const { maybe } = require('../scripts/util')

router.use('/public', express.static('public'))

router.get('/', loggedIn, (_, res) => {
  res.redirect('/horse/queue')
})

// Send 204 No Content to avoid a 404 error
router.get('/favicon.ico', (_, res) => res.status(204))

router.post('/register', loggedOut, (req, res, next) => {
  console.log('registering user')
  User.register(
    new User({ username: req.body.email, role: req.body.role }),
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
  let email
  let role
  jwt.verify(req.params.token, process.env.JWT_KEY, (err, body) => {
    if (err) return res.sendStatus(403)
    email = body.email
    role = body.role
  })

  res.render('register.ejs', { email, role })
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
  const pureQuery = decodeURI(req.url.replace('/search?query=', ''))

  let horses = await Horse.find({ name: pureQuery }).sort({ id: 1 })

  if (horses.length === 0) {
    horses = await Horse.find({ owner: pureQuery }).sort({ id: 1 })

    if (horses.length === 0) {
      horses = await Horse.find({ location: pureQuery }).sort({ id: 1 })

      /*No horses found via current query.
      Search for all matches that begin with query*/
      if (horses.length === 0) {
        const pattern = pureQuery.replace(pureQuery, '^' + pureQuery + '.*')
        horses = await Horse.find({ name: { $regex: pattern, $options: 'i' } })
      }
    }
  }
  res.render('search.ejs', { username: req.user.username, horses: horses })
})

router.post('/search', async (req, res) => {
  const howMany = await Horse.find({ name: req.body.query })

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

router.get('/autocomplete', loggedIn, async (req, res) => {
  const regex = new RegExp(req.query['term'], 'i')

  const [horseName, horseOwner, horseLocation] = await Promise.all([
    Horse.find({ name: regex }, { name: 1 }).limit(30),

    Horse.find({ owner: regex }, { owner: 1 }).limit(30),

    Horse.find({ location: regex }, { location: 1 }).limit(30)
  ])

  const horses = horseOwner.concat(horseLocation).concat(horseName)

  const fullResult = horses.map(horse => ({
    id: horse._id,
    label: maybe(horse.name).or(maybe(horse.owner).or(horse.location))
  }))

  //Removing duplicate results from full result array
  const result = fullResult.filter(
    (item, index) =>
      fullResult.indexOf(fullResult.find(found => found.label === item.label)) === index
  )
  res.jsonp(result)
})

module.exports = router
