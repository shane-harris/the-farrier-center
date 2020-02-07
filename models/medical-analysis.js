'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const medicalSchema = new Schema({
  horse_id: Number,
  date: Date,
  farrier: String,
  gait: String,
  lameness: String,
  blemishes: String,
  laminitus: String
})

const medical = mongoose.model('medical', medicalSchema)

module.exports = medical
