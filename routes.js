'use strict'

const passport = require('passport')
const router = require('express').Router()
const Horse = require('./models/horse')
const User = require('./models/user')

const { loggedIn, redirectIfLoggedIn } = require('./middleware/auth')

router.get('/', loggedIn, (req, res) => {
  res.redirect('/queue')
})

router.get('/horses', loggedIn, (req, res) => {
  Horse.find()
    // sort by id (ascending)
    .sort({ id: 1 })
    .then(horses => res.render('horses.ejs', { horses }))
    .catch(console.error)
})

router.get('/horse/:id', loggedIn, (req, res) => {
  Horse.findOne({ id: req.params.id })
    .then(horse => res.render('horse.ejs', { horse }))
    .catch(console.error)
})

router.get('/new-horse', (req, res) => {
  res.render('new-horse.ejs')
})

router.post('/new-horse', (req, res) => {
  console.log(req.body)
  new Horse({
    name: req.body.name
  }).save(console.error)
})

router.get('/new-medical-analysis', (req, res) => {
  res.render('new-medical-analysis.ejs')
})

router.get('/new-shoeing', (req, res) => {
  res.render('new-shoeing.ejs')
})

router.get('/user', loggedIn, (req, res) => {
  res.render('user.ejs')
})

router.get('/queue', loggedIn, (req, res) => {
  Horse.find()
    // sort by lastVisit (ascending)
    .sort({ lastVisit: 1 })
    .then(horses => res.render('queue.ejs', { horses }))
    .catch(console.error)
})

router.get('/register', redirectIfLoggedIn, (req, res) => {
  res.render('register.ejs', {})
})

router.post('/register', (req, res, next) => {
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

module.exports = router
