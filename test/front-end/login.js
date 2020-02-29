'use strict'

const chai = require('chai')
chai.should()
const { By } = require('selenium-webdriver')
const { skipIfDisabled } = require('./util')
const { getDriver } = require('./driver')
const driver = getDriver()

describe('Login', () => {
  before(async function() {
    skipIfDisabled(this)
    this.timeout(10000)

    await driver.get('http://localhost:9090/logout')
  })

  it('Should fail to login with bad credentials', async () => {
    await driver.findElement(By.id('username')).sendKeys('test')
    await driver.findElement(By.id('password')).sendKeys('wrongpassword')
    await driver.findElement(By.id('login')).click()
    const url = await driver.getCurrentUrl()
    await url.should.equal('http://localhost:9090/login')
  })

  it('Should successfully login with valid credentials', async () => {
    await driver.findElement(By.id('username')).sendKeys('test')
    await driver.findElement(By.id('password')).sendKeys('test')
    await driver.findElement(By.id('login')).click()
    const url = await driver.getCurrentUrl()
    await url.should.equal('http://localhost:9090/horse/queue')
  })

  it('Should have the correct title', async () => {
    const title = await driver.getTitle()
    await title.should.equal('Login | Farrier Center')
  })

  afterEach(async () => await driver.get('http://localhost:9090/logout'))
})
