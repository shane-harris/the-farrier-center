'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShoeingSchema = new Schema({
  horse_id: Number,
  date: Date,
  farrier: String,

  frontLeft: {
    type: Schema.Types.ObjectID,
    ref: 'Horseshoe'
  },
  frontRight: {
    type: Schema.Types.ObjectID,
    ref: 'Horseshoe'
  },
  backLeft: {
    type: Schema.Types.ObjectID,
    ref: 'Horseshoe'
  },
  backRight: {
    type: Schema.Types.ObjectID,
    ref: 'Horseshoe'
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
