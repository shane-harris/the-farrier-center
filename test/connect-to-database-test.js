'use strict'
const mongoose = require('mongoose')
const config = require('../config/config.js')
const Horse = require('../models/horse')
const chai = require('chai')
chai.use(require('chai-http'))
chai.should()

describe('Database tests', () => {
  before(done => {
    mongoose
      .connect(config.mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log('We are connected to test database!')
        new Horse({ name: 'dummyHorse' }).save(done)
      })
      .catch(console.error.bind(console, 'connection error'))
  })

  after(done => {
    // Delete all dummy horses, in case they start to accumulate
    Horse.deleteMany({ name: 'dummyHorse' })
      .then(() => done())
      .catch(done)
      .finally(() => mongoose.connection.close())
  })

  describe('Test Creation and Reading from db', () => {
    it('Should retrieve data from test database', done => {
      //Look up the 'dummyHorse' object previously saved.
      Horse.findOne({ name: 'dummyHorse' })
        .then(horse => {
          horse.name.should.equal('dummyHorse')
          done()
        })
        .catch(done)
    })
  })
})
