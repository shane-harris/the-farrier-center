const User = require('../models/user')

const defaultUser = {
  fname: 'admin',
  lname: 'admin',
  email: 'farrierdev@gmail.com',
  role: 'admin'
}
const makeDefaultAdmin = defaultUser => {
  User.findOne({ email: 'farrierdev@gmail.com' }, (user, err) => {
    if (user) {
      console.log('Found default admin, skipping creation...')
    } else {
      console.log('Default admin not found, creating user...')
    }
  })
}

module.exports = { makeDefaultAdmin }
