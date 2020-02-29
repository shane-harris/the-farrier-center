'use strict'

const chai = require('chai')
chai.should()
const { getDriver, logIn } = require('./driver')
const driver = getDriver()

describe('Queue', () => {
  before(async function() {
    if (process.env.TEST_FRONT_END === 'false') {
      this.skip()
    }
    this.timeout(10000)
    return logIn('test', 'test')
  })

  it('Has the correct title', async () => {
    const title = await driver.getTitle()
    await title.should.equal('Horse Queue | Farrier Center')
  }).timeout(10000)

  after(async () => {
    if (process.env.TEST_FRONT_END === 'false') {
      return
    }
    return driver.get('http://localhost:9090/logout')
  })
})
