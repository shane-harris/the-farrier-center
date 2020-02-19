const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const User = require('../models/user')
var jwt = require('jsonwebtoken')
const { loggedIn, redirectIfLoggedIn } = require('../middleware/auth')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

router.use('/public', express.static('public'))

router.get('/', loggedIn, (req, res) => {
  res.render('user.ejs', { username: req.user.username })
})

router.get('/theme', loggedIn, (req, res) => {
  res.render('theme.ejs', { user: req.user })
})

router.post('/theme', loggedIn, (req, res) => {
  console.log(`Changing theme for ${req.user.username} to ${req.body.theme}`)
  req.user.theme = req.body.theme
  req.user.save()
  res.redirect('/user/theme')
})

router.post('/forgot-password', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      req.flash('error', 'could not find account with that email adress')
      return res.redirect('/login')
    }
    else {
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
      } catch (e) {
        console.log(e)
      }
      // not actually an error
      req.flash('error', 'link to reset password sent you email')
      return res.redirect('/login')
    }
  })

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

module.exports = router
