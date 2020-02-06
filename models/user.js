'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  fname: String,
  lname: String,
  email: {
    type: String,
    Required: 'Email address cannot be left blank.',
    index: { unique: true, dropDups: true }
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  }
})

User.plugin(require('passport-local-mongoose'))

module.exports = mongoose.model('User', User)
