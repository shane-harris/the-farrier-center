const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { isAdmin, sendRegEmail } = require('../middleware/auth')

router.use(isAdmin)
router.use('/public', express.static('public'))
//Admin Routes
router.get('/', (req, res) => {
  res.render('admin.ejs', { username: req.user.username })
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

module.exports = router
