'use strict'

const express = require('express')
const router = express.Router()
const { loggedIn } = require('../middleware/auth')

router.use('/public', express.static('public'))

router.get('/', loggedIn, (req, res) => {
  res.render('user.ejs')
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

module.exports = router
