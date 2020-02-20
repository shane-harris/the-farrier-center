'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
  id: Number,
  url: String
})

const Image = mongoose.Schema('image', ImageSchema)

module.exports = Image
