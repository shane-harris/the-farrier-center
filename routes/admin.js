'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { isAdmin, sendRegistrationEmail } = require('../middleware/auth')

router.use(isAdmin)
router.use('/public', express.static('public'))

router.get('/', async (req, res) => {
  const users = await User.find().sort({ lname: 1, username: 1 })
  res.render('admin.ejs', { username: req.user.username, users })
})

router.post('/register', async (req, res) => {
  const role = req.body.adminCheck === 'on' ? 'admin' : 'user'
  await User.register(new User({ username: req.body.username, role }), req.body.password)
  res.redirect('/admin')
})

router.post('/send-email', sendRegistrationEmail)

module.exports = router
