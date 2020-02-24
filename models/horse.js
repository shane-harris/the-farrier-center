'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Images = require('./image')
const Schema = mongoose.Schema

const HorseSchema = new Schema({
  image: { type: Schema.Types.ObjectId, ref: 'images' },
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
    hoofImage1: { type: Schema.Types.ObjectId, ref: 'images' },
    hoofImage2: { type: Schema.Types.ObjectId, ref: 'images' },
    shoeType: String,
    shoeSize: Number,
    notes: String
  }
})
HorseSchema.plugin(AutoIncrement, { inc_field: 'id' })

const Horse = mongoose.model('horses', HorseSchema)

module.exports = Horse
