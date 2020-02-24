'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Horses = require('./horse')
const Medicals = require('./medical')
const Shoeings = require('./shoeing')
const Users = require('./user')

const ImageSchema = new Schema({
  ref_id: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onType'
  },
  onType: {
    type: String,
    required: true,
    enum: ['horses', 'medical', 'shoeing', 'User']
  },
  public_id: String,
  url: String
})

const Image = mongoose.model('images', ImageSchema)

module.exports = Image
