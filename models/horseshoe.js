'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema

const HorseshoeSchema = new Schema({
  hoof: String,
  hoofImage1: String,
  hoofImage2: String,
  shoeType: String,
  shoeSize: Number,
  notes: String
})
HorseshoeSchema.plugin(AutoIncrement, { inc_field: 'id' })

const Horseshoe = mongoose.model('horses', HorseshoeSchema)

module.exports = Horseshoe
