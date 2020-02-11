'use strict'

const passport = require('passport')
const router = require('express').Router()
const Medical = require('./models/medical')
const Horse = require('./models/horse')
const User = require('./models/user')
const Shoeing = require('./models/shoeing')

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
    name: req.body.name,
    gender: req.body.gender,
    temperament: req.body.temperament,
    discipline: req.body.discipline,
    location: req.body.location,
    owner: req.body.owner,
    vet: req.body.vet,
    history: req.body.history
  }).save(console.error)
  res.redirect('/horses')
})

router.get('/horse/:id/new-medical-analysis', (req, res) => {
  Horse.findOne({ id: req.params.id })
    .then(horse => res.render('new-medical-analysis.ejs', { horse }))
    .catch(console.error)
})

router.post('/horse/:id/new-medical-analysis', (req, res) => {
  console.log(req.body)
  new Medical({
    horse_id: req.params.id,
    date: new Date(),
    farrier: 'Default Steve',
    gait: req.body.gait,
    lameness: req.body.lameness,
    blemishes: req.body.blemishes,
    laminitus: req.body.laminitus
  }).save(console.error)
  res.redirect(`/horse/${req.params.id}`)
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
