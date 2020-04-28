'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicalSchema = new Schema({
  images: [String],
  gait: String,
  lameness: String,
  blemishes: String,
  laminitus: String,
  notes: [String]
})

const HorseshoeSchema = new Schema({
  images: [String],
  hoof: {
    type: String,
    required: true,
    enum: ['Left', 'Right']
  },
  shoeSize: Number,
  notes: [String]
})

const ShoeingSchema = new Schema({
  horseshoes: [HorseshoeSchema],
  notes: [String],
  shoes: [
    {
      type: String,
      enum: [
        'pads',
        'straightbarshoe',
        'eggbar',
        'specialbarshoe',
        'rolledtoe',
        'onionheel',
        'wideweb',
        'narrowweb'
      ]
    }
  ],
  materials: [
    {
      type: String,
      enum: [
        'limbbrace',
        'aluminium',
        'titanium',
        'poly',
        'impressionmaterials',
        'glueonshoes',
        'equilibrium',
        'pourin',
        'glue'
      ]
    }
  ],
  services: [
    {
      type: String,
      enum: [
        'drilltap',
        'quartercrackrepair',
        'resection',
        'rehabilitation',
        'surgeonconsult',
        'gluerepair'
      ]
    }
  ]
})

const ReportSchema = new Schema({
  images: [String],
  horse_id: Number,
  date: Date,
  farrier: String,
  jobType: {
    type: String,
    enum: ['Full', 'Half', 'Trim']
  },
  medical: MedicalSchema,
  front: ShoeingSchema,
  back: ShoeingSchema,
  notes: [String]
})
const Report = mongoose.model('report', ReportSchema)

module.exports = Report
