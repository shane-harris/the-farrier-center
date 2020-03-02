'use strict'

const chai = require('chai')
chai.should()
const { By } = require('selenium-webdriver')
const { getDriver, logIn } = require('./driver')
const driver = getDriver()
const testHeaderNav = require('./header-nav')

const route = route => `http://localhost:9090${route}`

describe('All Horses page', () => {
  before(async function() {
    if (process.env.TEST_FRONT_END === 'false') {
      this.skip()
    }
    this.timeout(10000)
    return logIn('test', 'test')
  })

  after(async () => {
    if (process.env.TEST_FRONT_END !== 'false') {
      return driver.get(route('/logout'))
    }
  })

  beforeEach(async () => await driver.get(route('/horse/all')))

  it('Should have correct title', async () => {
    const title = await driver.getTitle()
    title.should.equal('All Horses | Farrier Center')
  })

  it('Should show horses', async () => {
    const elements = await driver.findElements(By.linkText('Secretariat'))
    elements.length.should.equal(1)
  })

  describe('Horses', () => {
    it('Should have the correct link', async () => {
      const urls = await Promise.all([
        driver.findElement(By.linkText('Secretariat')).getAttribute('href'),
        driver.findElement(By.linkText('Buttercup')).getAttribute('href')
      ])
      urls[0].should.equal(route('/horse/0'))
      urls[1].should.equal(route('/horse/1'))
    })

    it('Should be clickable', async () => {
      await driver.findElement(By.linkText('Secretariat')).click()
      const url = await driver.getCurrentUrl()
      url.should.equal(route('/horse/0'))
    }).timeout(5000)
  })

  testHeaderNav()
})
