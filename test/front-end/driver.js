'use strict'

const chrome = require('selenium-webdriver/chrome')
const { Builder, By } = require('selenium-webdriver')

let driver

const startDriver = () => {
  driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize({ width: 1920, height: 1080 }))
    .build()
}

/**
 * Causes selenium to log in to the site
 *
 * @returns {Promise} A promise which resolves once selenium has logged in
 */
const logIn = async (username, password) => {
  await driver.get('http://localhost:9090/')
  const url = await driver.getCurrentUrl()
  if (url === 'http://localhost:9090/login') {
    await driver.findElement(By.id('username')).sendKeys(username)
    await driver.findElement(By.id('password')).sendKeys(password)
    await driver.findElement(By.id('login')).click()
  }
}

const getDriver = () => driver

module.exports = { startDriver, getDriver, logIn }
