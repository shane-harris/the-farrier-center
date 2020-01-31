const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({})

User.plugin(require('passport-local-mongoose'))

module.exports = mongoose.model('User', User)
