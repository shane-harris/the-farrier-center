'use strict'

const chai = require('chai')
chai.should()
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

  testHeaderNav()
})
