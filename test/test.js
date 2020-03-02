'use strict'

/**----------------------------------------------------------------------------------------------**
 ** This file is the entry point for all tests
 **----------------------------------------------------------------------------------------------**/

const Mocha = require('mocha')
const fs = require('fs')
const util = require('util')
const path = require('path')
const readdir = util.promisify(fs.readdir)
const { startDriver, getDriver } = require('./front-end/driver')
const { dbConnected } = require('../scripts/util')
process.env.PORT = 9090
process.env.NODE_ENV = 'test'
require('../index')

const mocha = new Mocha()

const runTests = async () => {
  const tests = ['test/back-end', 'test/front-end']
  await Promise.all(
    tests.map(async dir => {
      const files = await readdir(dir)
      files
        .filter(file => file.substr(-3) === '.js')
        .forEach(file => mocha.addFile(path.join(dir, file)))
    })
  )
  mocha.run(failures => {
    if (process.env.TEST_FRONT_END !== 'false') {
      console.log('Shutting down selenium web-driver')
      getDriver().quit()
    }
    process.exit(failures)
  })
}

if (process.env.TEST_FRONT_END !== 'false') {
  dbConnected().then(() => {
    console.log('Starting selenium web-driver')
    startDriver()
    runTests()
  })
} else {
  runTests()
}
