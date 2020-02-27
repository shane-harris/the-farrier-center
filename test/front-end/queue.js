'use strict'

const chai = require('chai')
chai.should()
const { By } = require('selenium-webdriver')
const { skipIfDisabled } = require('./util')
const { getDriver } = require('./driver')
const driver = getDriver()

describe('Queue', () => {
  before(function(done) {
    skipIfDisabled(this)
    this.timeout(10000)

    driver
      .get('http://localhost:9090/')
      .then(() => driver.findElement(By.id('username')).sendKeys('michael'))
      .then(() => driver.findElement(By.id('password')).sendKeys('a'))
      .then(() => driver.findElement(By.id('login')).click())
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
