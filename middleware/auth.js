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

const loggedOut = (req, res, next) => {
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
const sendRegistrationEmail = async (req, res) => {
  let role = req.body.adminCheck === 'on' ? 'admin' : 'user'
  try {
    const token = jwt.sign(
      {
        email: req.body.email,
        role
      },

      process.env.JWT_KEY,
      {
        expiresIn: '12h'
      }
    )

    const url = `http://localhost:8000/register/${token}`
    if (req.body.adminCheck === 'on') {
      await transporter.sendMail({
        to: req.body.email,
        subject: 'Welcome to The Farrier Center',
        html: `Create Your Admin Account: <a href="${url}">${url}</a>`
      })
    } else {
      await transporter.sendMail({
        to: req.body.email,
        subject: 'Welcome to The Farrier Center',
        html: `Create Your Account: <a href="${url}">${url}</a>`
      })
    }
  } catch (e) {
    console.log(e)
  }
  res.redirect('/admin')
}

module.exports = { loggedIn, loggedOut, isAdmin, sendRegistrationEmail }
