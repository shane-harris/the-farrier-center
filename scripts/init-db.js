'use strict'

const User = require('../models/user')

const makeDefaultAdmin = async () => {
  const defaultUser = {
    fname: 'admin',
    lname: 'admin',
    username: 'farrierAdmin',
    email: 'farrierdev@gmail.com',
    role: 'admin',
    password: 'farrierdev'
  }

  const user = await User.findOne({ email: 'farrierdev@gmail.com' })
  if (user) {
    console.log('Found default admin, skipping creation...')
  } else {
    console.log('Default admin not found, creating user...')
    User.register(new User(defaultUser), defaultUser.password, err => {
      if (err) {
        console.log('error while user register!', err)
      } else {
        console.log('default admin successfuly created')
      }
    })
  }
}

module.exports = { makeDefaultAdmin }
