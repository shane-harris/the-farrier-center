let assert = require('assert')
let Horse = require('../models/horse') //imports the horse model.
describe('Creating horses', () => {
  it('creates a horse', done => {
    //assertion is not included in mocha so
    //require assert which was installed along with mocha
    const dummyHorse = new Horse({ name: 'dummyHorse' })
    dummyHorse
      .save() //takes some time and returns a promise
      .then(() => {
        assert(!dummyHorse.isNew) //if poke is saved to db it is not new
        done()
      })
  })
})
