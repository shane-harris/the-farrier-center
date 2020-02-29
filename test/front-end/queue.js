'use strict'

const chai = require('chai')
chai.should()
const { skipIfDisabled } = require('./util')
const { getDriver, logIn } = require('./driver')
const driver = getDriver()

describe('Queue', () => {
  before(async function() {
    skipIfDisabled(this)
    this.timeout(10000)
    await logIn('test', 'test')
  })

  it('Has the correct title', async () => {
    const title = await driver.getTitle()
    await title.should.equal('Horse Queue | Farrier Center')
  }).timeout(10000)

  after(async () => driver.get('http://localhost:9090/logout'))
})
