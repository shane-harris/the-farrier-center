'use strict'

const chai = require('chai')
chai.should()
const { By } = require('selenium-webdriver')
const { getDriver, logIn } = require('./driver')
const driver = getDriver()

const route = route => `http://localhost:9090${route}`

describe('Queue page', () => {
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

  beforeEach(async () => await driver.get(route('/horse/queue')))

  it('Should have correct title', async () => {
    const title = await driver.getTitle()
    title.should.equal('Horse Queue | Farrier Center')
  })

  it('Should have horses', async () => {
    const elements = await driver.findElements(By.linkText('Secretariat'))
    elements.length.should.equal(1)
  })

  describe('Horses', () => {
    it('Should have the correct link', async () => {
      const url1 = await driver.findElement(By.linkText('Secretariat')).getAttribute('href')
      url1.should.equal(route('/horse/0'))
      const url2 = await driver.findElement(By.linkText('Buttercup')).getAttribute('href')
      url2.should.equal(route('/horse/1'))
    })
  })

  describe('The navbar', () => {
    it('Should exist', async () => {
      const found = await driver.findElements(By.id('header-nav'))
      found.length.should.equal(1)
    })

    const shouldHaveLink = (text, route) => {
      it(`Should have ${text} link`, async () => {
        const url = await driver
          .findElement(By.id('header-nav'))
          .findElement(By.linkText(text))
          .getAttribute('href')
        url.should.equal(route)
      })
    }

    shouldHaveLink('The Farrier Center', route('/'))
    shouldHaveLink('Queue', route('/horse/queue'))
    shouldHaveLink('Horses', route('/horse/all'))
    shouldHaveLink('New Horse', route('/horse/new'))
    shouldHaveLink('Admin', route('/admin'))
  })
})
