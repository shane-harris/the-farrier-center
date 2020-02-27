'use strict'

const Mocha = require('mocha')
const fs = require('fs')
const util = require('util')
const path = require('path')
const readdir = util.promisify(fs.readdir)
const { ifEnabled: ifFrontEndEnabled, ifDisabled: ifFrontEndDisabled } = require('./front-end/util')
const { startDriver, getDriver } = require('./front-end/driver')
const { dbConnected } = require('../scripts/util')
process.env.PORT = 9090
process.env.NODE_ENV = 'test'
require('../index')

const mocha = new Mocha()

const runTests = () => {
  const tests = ['test/back-end', 'test/front-end']
  return Promise.all(
    tests.map(dir =>
      readdir(dir).then(files =>
        files
          .filter(file => file.substr(-3) === '.js')
          .forEach(file => mocha.addFile(path.join(dir, file)))
      )
    )
  )
    .then(() =>
      mocha.run(failures => {
        ifFrontEndEnabled(() => {
          console.log('Shutting down selenium web-driver')
          getDriver().quit()
        }).then(() => process.exit(failures))
      })
    )
    .catch(console.error)
}

console.log('Waiting for database to connect...')
dbConnected().then(() => {
  ifFrontEndEnabled(() => {
    console.log('Starting selenium web-driver')
    startDriver()
    runTests()
  })
  ifFrontEndDisabled(runTests)
})
