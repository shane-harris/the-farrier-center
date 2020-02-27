'use strict'

const chai = require('chai')
chai.should()
const { By } = require('selenium-webdriver')
const { skipIfDisabled } = require('./util')
const { getDriver } = require('./driver')
const driver = getDriver()

describe('Login', () => {
  before(function(done) {
    skipIfDisabled(this)
    this.timeout(10000)

    driver
      .get('http://localhost:9090/logout')
      .then(() => driver.get('http://localhost:9090'))
      .then(() => done())
      .catch(done)
  })

  it('Should fail to login with bad credentials', done => {
    driver
      .findElement(By.id('username'))
      .sendKeys('michael')
      .then(() => driver.findElement(By.id('password')).sendKeys('b'))
      .then(() => driver.findElement(By.id('login')).click())
      .then(() => driver.getTitle())
      .then(title => title.should.equal('Login | Farrier Center'))
      .then(() => done())
      .catch(done)
  })
})
