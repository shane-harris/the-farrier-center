'use strict'

const chrome = require('selenium-webdriver/chrome')
const { Builder } = require('selenium-webdriver')

let driver

const startDriver = () => {
  driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize({ width: 1920, height: 1080 }))
    .build()
}

const getDriver = () => driver

module.exports = { startDriver, getDriver }
