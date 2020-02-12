'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShoeingSchema = new Schema({
  horse_id: Number,
  date: Date,
  farrier: String,
  frontLeft: {
    hoof: String,
    hoofImage1: String,
    hoofImage2: String,
    shoeType: String,
    shoeSize: Number,
    notes: String
  },
  frontRight: {
    hoof: String,
    hoofImage1: String,
    hoofImage2: String,
    shoeType: String,
    shoeSize: Number,
    notes: String
  },
  backLeft: {
    hoof: String,
    hoofImage1: String,
    hoofImage2: String,
    shoeType: String,
    shoeSize: Number,
    notes: String
  },
  backRight: {
    hoof: String,
    hoofImage1: String,
    hoofImage2: String,
    shoeType: String,
    shoeSize: Number,
    notes: String
  },
  pads: Boolean,
  straightbarshoe: Boolean,
  eggbar: Boolean,
  specialbarshoe: Boolean,
  rolledtoe: Boolean,
  onionheel: Boolean,
  wideweb: Boolean,
  narrowweb: Boolean,
  limbbrace: Boolean,
  aluminium: Boolean,
  titanium: Boolean,
  poly: Boolean,
  impressionmaterials: Boolean,
  glueonshoes: Boolean,
  equilibrium: Boolean,
  pourin: Boolean,
  glue: Boolean,
  drilltap: Boolean,
  gluerepair: Boolean,
  quartercrackrepair: Boolean,
  resection: Boolean,
  rehabilitation: Boolean,
  surgeonconsult: Boolean,
  other: String
})

const Shoeing = mongoose.model('shoeing', ShoeingSchema)

module.exports = Shoeing
