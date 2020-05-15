'use strict'

const chai = require('chai')
chai.should()
const { By } = require('selenium-webdriver')
const { getDriver } = require('./driver')
const driver = getDriver()

describe('Login page', () => {
  before(async function() {
    if (process.env.TEST_FRONT_END === 'false') {
      this.skip()
    }
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

  it('Should fail to login with correct username, wrong password', async () => {
    await driver.findElement(By.id('username')).sendKeys('dimitri')
    await driver.findElement(By.id('password')).sendKeys('wrongpassword')
    await driver.findElement(By.id('login')).click()
    const url = await driver.getCurrentUrl()
    await url.should.equal('http://localhost:9090/login')
  })

  it('Should fail to login with another users password', async () => {
    await driver.findElement(By.id('username')).sendKeys('test')
    await driver.findElement(By.id('password')).sendKeys('password1')
    await driver.findElement(By.id('login')).click()
    const url = await driver.getCurrentUrl()
    await url.should.equal('http://localhost:9090/login')
  })

  it('Should fail to login with correct username in the wrong capitalization', async () => {
    await driver.findElement(By.id('username')).sendKeys('DIMITRI')
    await driver.findElement(By.id('password')).sendKeys('password1')
    await driver.findElement(By.id('login')).click()
    const url = await driver.getCurrentUrl()
    await url.should.equal('http://localhost:9090/login')
  })

  it('Should fail to login with correct password in the wrong capitalization', async () => {
    await driver.findElement(By.id('username')).sendKeys('dimitri')
    await driver.findElement(By.id('password')).sendKeys('PASSWORD1')
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

  afterEach(async () => {
    if (process.env.TEST_FRONT_END === 'false') {
      return
    }
    return driver.get('http://localhost:9090/logout')
  })
})
