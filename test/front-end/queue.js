'use strict'

const chai = require('chai')
chai.should()
const { By } = require('selenium-webdriver')
const { skipIfDisabled } = require('./util')
const { getDriver, logIn } = require('./driver')
const driver = getDriver()

describe('Queue', () => {
  before(function(done) {
    skipIfDisabled(this)
    this.timeout(10000)
    logIn()
      .then(() => done())
      .catch(done)
  })

  it('Has the correct title', done => {
    driver
      .getTitle()
      .then(title => title.should.equal('Horse Queue | Farrier Center'))
      .then(() => done())
      .catch(done)
  }).timeout(10000)
})
