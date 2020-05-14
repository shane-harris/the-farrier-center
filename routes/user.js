'use strict'

const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const User = require('../models/user')
var jwt = require('jsonwebtoken')
const { loggedIn, loggedOut } = require('../middleware/auth')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

router.use('/public', express.static('public'))

router.get('/', loggedIn, (req, res) => {
  res.render('user.ejs', { user: req.user })
})

router.get('/theme', loggedIn, (req, res) => {
  res.render('theme.ejs', { user: req.user })
})

router.post('/theme', loggedIn, async (req, res) => {
  req.user.theme = req.body.theme
  await req.user.save()
  res.redirect('/user')
})

router.post('/forgot-password', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    req.flash('error', 'could not find account with that email adress')
    return res.redirect('/login')
  } else {
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

      const url = `http://localhost:8000/user/reset-password/${token}`

      transporter.sendMail({
        to: req.body.email,
        subject: 'Reset Your Password',
        html: `Follow the link to reset your password: <a href="${url}">${url}</a>`
      })
    } catch (err) {
      console.log(err)
    }
    // Not actually an error
    req.flash('error', 'Link to reset password sent you email')
    return res.redirect('/login')
  }
})

// Change password while not logged in
router.get('/reset-password/:token', loggedOut, (req, res) => {
  jwt.verify(req.params.token, process.env.JWT_KEY, (err, email) => {
    if (err) return res.sendStatus(403)
    req.email = email
  })
  res.render('reset-password.ejs', { token: req.params.token })
})

router.post('/reset-password/:token', async (req, res) => {
  var userEmail
  jwt.verify(req.params.token, process.env.JWT_KEY, (err, message) => {
    if (err) return res.sendStatus(403)
    userEmail = message.email
  })
  try {
    const user = await User.findOne({ email: userEmail })
    if (!user) return res.sendStatus(500)
    user.setPassword(req.body.password1, (err, user) => {
      if (err) {
        res.json({ success: false, message: 'Unable to update password.' })
      }
      user.save()
      req.flash('error', 'successfuly changed password')
      res.redirect('/login')
    })
  } catch (_) {
    res.sendStatus(500)
  }
})

// Change password while logged in
router.post('/update-password', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username })
    user.changePassword(req.body.currentpass, req.body.newpass, err => {
      if (err) {
        res.redirect('/user')
      }
    })
  } catch (_) {
    res.sendStatus(500)
  } finally {
    res.redirect('/user')
  }
})

router.post('/update-info', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username })
    user.fname = req.body.fname
    user.lname = req.body.lname
    user.phone = req.body.phone
    user.save()
  } finally {
    res.redirect('/user')
  }
})

router.post('/bio', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username })
    user.bio = req.body.bioForm
    user.save()
  } finally {
    res.redirect('/user')
  }
})

module.exports = router
