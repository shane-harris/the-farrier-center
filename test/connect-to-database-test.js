'use strict'
const mongoose = require('mongoose')
const config = require('../config/config.js')
let Horse = require('../models/horse') //imports the horse model.

describe('Database tests', () => {
  before(done => {
    mongoose.connect(config.mongo_url)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', () => {
      console.log('We are connected to test database!')
      done()
    })
  })

  after(done => {
    mongoose.connection.close()
    done()
  })

  describe('Test Creation and Reading from db', () => {
    //Save object with 'name' value of 'dummyHorse"
    it('New name saved to test database', done => {
      var testName = Horse({
        name: 'dummyHorse'
      })
      testName.save(done)
    })

    it('Should retrieve data from test database', done => {
      //Look up the 'dummyHorse' object previously saved.
      Horse.find({ name: 'dummyHorse' }, (err, name) => {
        if (err) {
          throw err
        }
        if (name.length === 0) {
          throw new Error('No data!')
        }
        done()
      })
    })

    it('Should remove the dummyHorse entry from database', done => {
      Horse.deleteOne({ name: 'dummyHorse' }, err => {
        if (err) {
          throw err
        }
        done()
      })
    })
  })
})
