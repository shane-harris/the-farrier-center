'use strict'

const User = require('../models/user')

const makeDefaultAdmin = () => {
  const defaultUser = {
    fname: 'admin',
    lname: 'admin',
    username: 'farrierAdmin',
    email: 'farrierdev@gmail.com',
    role: 'admin',
    password: 'farrierdev'
  }

  User.findOne({ email: 'farrierdev@gmail.com' }, (err, user) => {
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
  })
}

module.exports = { makeDefaultAdmin }
