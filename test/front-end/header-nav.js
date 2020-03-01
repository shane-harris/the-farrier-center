'use strict'

const chai = require('chai')
chai.should()
const { By } = require('selenium-webdriver')
const driver = require('./driver').getDriver()

const route = route => `http://localhost:9090${route}`

const testHeaderNav = () => {
  describe('The header nav bar', () => {
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
}

module.exports = testHeaderNav
