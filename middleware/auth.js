'use strict'

const nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken')

//User Authentication middleware
const loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

const redirectIfLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next()
  } else {
    res.redirect('/queue')
  }
}

//Email Middleware
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})
const sendEmail = async (req, res) => {
  try {
    const token = jwt.sign(
      {
        email: req.body.email
      },

      process.env.JWT_KEY,
      {
        expiresIn: '12h'
      }
    )

    const url = `http://localhost:8000/register/${token}`

    await transporter.sendMail({
      to: req.body.email,
      subject: 'Welcome to The Farrier Center',
      html: `Create Your Account: <a href="${url}">${url}</a>`
    })
  } catch (e) {
    console.log(e)
  }
  res.redirect('/admin')
}

module.exports = { loggedIn, redirectIfLoggedIn, isAdmin, sendEmail }
