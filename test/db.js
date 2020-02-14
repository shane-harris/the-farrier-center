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
      .then(() => done())
      .catch(done)
  })

  after(done => {
    // Delete all dummy horses, in case they start to accumulate
    Horse.deleteMany({ name: 'dummyHorse' })
      .then(() => done())
      .catch(done)
      .finally(() => mongoose.connection.close())
  })

  beforeEach(done => {
    // Delete any dummy horses already in the DB
    Horse.deleteMany({ name: 'dummyHorse' })
      .then(() => {
        // If deletion succeeded, save a new dummy horse to the DB
        new Horse({ name: 'dummyHorse' }).save(done)
      })
      .catch(done)
  })

  describe('Reading a horse from the db', () => {
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
