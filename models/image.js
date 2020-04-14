'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
  ref_id: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onType'
  },
  onType: {
    type: String,
    required: true,
    enum: ['horses', 'medical', 'shoeing', 'report']
  },
  public_id: String,
  url: String
})

const Image = mongoose.model('images', ImageSchema)

module.exports = Image
