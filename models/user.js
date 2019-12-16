const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user_schema = new Schema({
  fname: String,
  lname: String,
  password: String,
  email: String,
  phone: String
})

const user = mongoose.model('user', user_schema)

module.exports = user
