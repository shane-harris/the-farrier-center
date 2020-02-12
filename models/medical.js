'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicalSchema = new Schema({
  horse_id: Number,
  date: Date,
  farrier: String,
  gait: String,
  lameness: String,
  blemishes: String,
  laminitus: String
})

const Medical = mongoose.model('medical', MedicalSchema)

module.exports = Medical
