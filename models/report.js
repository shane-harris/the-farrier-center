'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicalSchema = new Schema({
  gait: String,
  lameness: String,
  blemishes: String,
  laminitus: String,
  notes: String,
  images: [{ type: Schema.Types.ObjectId, ref: 'images' }]
})

const HorseshoeSchema = new Schema({
  hoof: {
    type: String,
    required: true,
    enum: ['Left', 'Right']
  },
  shoeSize: Number,
  notes: String,
  images: [{ type: Schema.Types.ObjectId, ref: 'images' }]
})

const ShoeingSchema = new Schema({
  horseshoes: [HorseshoeSchema],
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
  notes: String,
  images: [{ type: Schema.Types.ObjectId, ref: 'images' }]
})
const Report = mongoose.model('report', ReportSchema)

module.exports = Report
