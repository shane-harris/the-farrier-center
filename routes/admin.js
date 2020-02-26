'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { loggedIn, isAdmin, sendRegEmail } = require('../middleware/auth')

router.use(isAdmin)
router.use('/public', express.static('public'))
//Admin Routes
router.get('/', (req, res) => {
  User.find()
    .sort({ lname: 1, username: 1 })
    .then(users => res.render('admin.ejs', { username: req.user.username, users }))
    .catch(console.error)
})

router.post('/register', (req, res) => {
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

router.post('/send-email', sendRegEmail)

// router.get('/all-users', loggedIn, (req, res) => {
//   User.find()
//     // sort by last name
//     .sort({ lname: 1 })
//     .then(users => res.render('admin.ejs', { users }))
//     .catch(console.error)
// })

module.exports = router
