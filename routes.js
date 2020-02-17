'use strict'

const passport = require('passport')
const express = require('express')
const router = require('express').Router()
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const Medical = require('./models/medical')
const Horse = require('./models/horse')
const User = require('./models/user')

const { sendRegEmail } = require('./middleware/emailer')
const { loggedIn, redirectIfLoggedIn, isAdmin } = require('./middleware/auth')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

// Serve contents of 'public' folder to the client
router.use('/public', express.static('public'))

router.get('/', loggedIn, (req, res) => {
  res.redirect('/queue')
})

router.get('/horses', loggedIn, (req, res) => {
  Horse.find()
    // sort by id (ascending)
    .sort({ id: 1 })
    .then(horses => res.render('horses.ejs', { username: req.user.username, horses: horses }))
    .catch(console.error)
})

router.get('/horse/:id', loggedIn, (req, res) => {
  Horse.findOne({ id: req.params.id })
    .then(horse => res.render('horse.ejs', { username: req.user.username, horse: horse }))
    .catch(console.error)
})

router.get('/new-horse', loggedIn, (req, res) => {
  res.render('new-horse.ejs', { name: req.user.username })
})

router.post('/new-horse', loggedIn, (req, res) => {
  console.log(req.body)
  new Horse(req.body).save(console.error)
  res.redirect('/horses')
})

router.get('/horse/:id/new-medical-analysis', loggedIn, (req, res) => {
  Horse.findOne({ id: req.params.id })
    .then(horse => res.render('new-medical-analysis.ejs', { horse, name: req.user.username }))
    .catch(console.error)
})

router.post('/horse/:id/new-medical-analysis', loggedIn, (req, res) => {
  console.log(req.body)
  new Medical({
    horse_id: req.params.id,
    date: new Date(),
    farrier: 'Default Steve',
    ...req.body
  }).save(console.error)
  res.redirect(`/horse/${req.params.id}`)
})

router.get('/new-shoeing', loggedIn, (req, res) => {
  res.render('new-shoeing.ejs', { name: req.user.username })
})

router.get('/user', loggedIn, (req, res) => {
  res.render('user.ejs', { username: req.user.username })
})

router.get('/admin', loggedIn, isAdmin, (req, res) => {
  res.render('admin.ejs', { username: req.user.username })
})

router.post('/admin-register', (req, res) => {
  const role = req.body.adminCheck === 'on' ? 'admin' : 'user'

  if (role === 'admin') {
    console.log('Registering admin user')
  }

  User.register(new User({ username: req.body.username, role }), req.body.password)
    .then(() => {
      console.log('User registered!')
      res.redirect('/admin')
    })
    .catch(err => console.error('Error while registering user!', err))
})

router.post('/send-email', (req, res, next) => { })

router.post('/forgot-password', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      req.flash('error', 'could not find account with that email adress')
      return res.redirect('login')
    }
  })
  try {
    const token = jwt.sign(
      {
        email: req.body.email
      },

      process.env.JWT_KEY,
      {
        expiresIn: '1h'
      }
    )

    const url = `http://localhost:8000/reset-password/${token}`

    transporter.sendMail({
      to: req.body.email,
      subject: 'Reset Your Password',
      html: `Follow the link to reset your password: <a href="${url}">${url}</a>`
    })
  } catch (e) {
    console.log(e)
  }
  // not actually an error
  req.flash('error', 'link to reset password sent you email')
  return res.redirect('login')
})

router.get('/reset-password/:token', redirectIfLoggedIn, (req, res) => {

  jwt.verify(req.params.token, process.env.JWT_KEY, (err, email) => {
    if (err) return res.sendStatus(403)
    req.email = email
  })
  res.render('reset-password.ejs', { token: req.params.token })
})

router.post('/reset-password/:token', (req, res, next) => {
  var userEmail
  jwt.verify(req.params.token, process.env.JWT_KEY, (err, message) => {
    if (err) return res.sendStatus(403)
    userEmail = message.email
  })
  User.findOne({ email: userEmail }, (err, user) => {

    if (err) {
      res.sendStatus(500)
    }
    else {
      if (user) {
        user.setPassword(req.body.password1, (err, user) => {
          if (err) {
            res.json({ success: false, message: 'Unable to update password.' });
          }
          user.save()
          req.flash('error', 'successfuly changed password')
          res.redirect('/login')
        })

      }
      else {
        res.sendStatus(500)
      }
    }
  })

})
router.post('/send-email', sendRegEmail)

router.get('/queue', loggedIn, (req, res) => {
  Horse.find()
    // sort by lastVisit (ascending)
    .sort({ lastVisit: 1 })
    .then(horses =>
      res.render('queue.ejs', {
        username: req.user.username,
        horses: horses,
        scripts: require('./scripts/queue-item')
      })
    )
    .catch(console.error)
})

router.get('/register', redirectIfLoggedIn, (req, res) => {
  res.render('register.ejs', {})
})

router.get('/register/:token', redirectIfLoggedIn, (req, res) => {
  jwt.verify(req.params.token, process.env.JWT_KEY, (err, email) => {
    if (err) return res.sendStatus(403)
    req.email = email
  })

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

router.get('/user/theme', loggedIn, (req, res) => {
  res.render('theme.ejs', { user: req.user })
})

router.post('/user/theme', (req, res) => {
  console.log(`Changing theme for ${req.user.username} to ${req.body.theme}`)
  req.user.theme = req.body.theme
  req.user.save()
  res.redirect('/user/theme')
})

module.exports = router
