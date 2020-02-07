'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HorseSchema = new Schema({
  id: Number,
  name: String,
  gender: String,
  temperament: String,
  discipline: String,
  location: String,
  owner: String,
  vet: String,
  lastVisit: Date,
  history: String,
  data: {
    hoof: String,
    hoofImage1: String,
    hoofImage2: String,
    shoeType: String,
    shoeSize: Number,
    notes: String
  }
})

const Horse = mongoose.model('horses', HorseSchema)

module.exports = Horse
