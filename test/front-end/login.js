'use strict'

const chai = require('chai')
chai.should()
const { By } = require('selenium-webdriver')
const { skipIfDisabled } = require('./util')
const { getDriver, logOut } = require('./driver')
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
      .then(() => driver.getCurrentUrl())
      .then(url => url.should.equal('http://localhost:9090/login'))
      .then(() => done())
      .catch(done)
  })

  it('Should successfully login with valid credentials', done => {
    driver
      .findElement(By.id('username'))
      .sendKeys('michael')
      .then(() => driver.findElement(By.id('password')).sendKeys('a'))
      .then(() => driver.findElement(By.id('login')).click())
      .then(() => driver.getCurrentUrl())
      .then(url => url.should.equal('http://localhost:9090/horse/queue'))
      .then(() => done())
      .catch(done)
  })

  after(logOut)
})
