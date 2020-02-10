'use strict'
const mongoose = require('mongoose')
const config = require('../config/config.js')
let Horse = require('../models/horse') //imports the horse model.

let encoded_connection_url =
  'mongodb+srv://' +
  config.username +
  ':' +
  config.password +
  '@farrier-dev-test-2pgqu.mongodb.net/test?retryWrites=true&w=majority'

describe('Database tests', function() {
  before(function(done) {
    mongoose.connect(encoded_connection_url)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', function() {
      console.log('We are connected to test database!')
      done()
    })
  })

  describe('Test Creation and Reading from db', function() {
    //Save object with 'name' value of 'dummyHorse"
    it('New name saved to test database', function(done) {
      var testName = Horse({
        name: 'dummyHorse'
      })
      testName.save(done)
    })

    it('Should retrieve data from test database', function(done) {
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

    it('Should remove the dummyHorse entry from database', function(done) {
      Horse.deleteOne({ name: 'dummyHorse' }, (err, obj) => {
        if (err) {
          throw err
        }
        done()
      })
    })
  })
  //After all tests are finished close connection
  //I am not sure if this is the proper way to handle this
  mongoose.connection.close()
})
