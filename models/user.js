'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  fname: String,
  lname: String,
  email: {
    type: String
  },
  phone: String,
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  theme: String,
  bio: String
})

User.plugin(require('passport-local-mongoose'))

module.exports = mongoose.model('User', User)
