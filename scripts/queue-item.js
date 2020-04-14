'use strict'

/**
 * Returns a hexidecimal number normalized between 0 and 255 based on the input
 * @param num         the number to be normalized
 * @param minimum     the new minimum value
 * @param maximum     the new maximum value
 * @param direction   a switch to direct the function to normalize normally or invert the value
 *  direction == 1:   a number to normalize that's close to the maximum will be closer to 255
 *  direction == 0:   a number to normalize that's close to the maximum will be closer to 0
 * @returns {string}  a zero-padded 2-digit string of the normalized hex value of num
 */
function getHex(num, minimum, maximum, direction) {
  let normalizedNum = (num - minimum) / (maximum - minimum)
  if (direction === 1) {
    // Puts the normalizedNum on the scale from 0-255 in hex
    normalizedNum *= 255
  } else {
    // Puts the normalizedNum on the scale from 255-0 in hex
    normalizedNum = (1 - normalizedNum) * 255
  }
  // Returns the normalizedNum in hex
  // Zero-pads the hex value to return a 2 digit string
  normalizedNum = Math.floor(normalizedNum)
  let hexString = normalizedNum.toString(16)
  if (hexString.length < 2) {
    hexString = '0' + hexString
  }
  return hexString
}

/**
 * Returns the lastVisitDate of a horse. If none exists, it returns today's date.
 * @param horse   A horse object
 * @returns {*}   A date
 */
function lastVisitDate(horse) {
  return typeof horse.lastVisit === 'undefined' ? new Date() : horse.lastVisit
}

/**
 * Computes a gradient color based on the number of days since the lastVisitDate of a horse
 * The gradient goes from green->yellow->red
 * [lastVisit < warnDays] = green
 * [warnDays < lastVisit < alertDays] = yellow
 * [alertDays <= lastVisit] = red
 * @param horse       A horse object from the database
 * @returns {string}  A hex string zero-padded (returns 00 instead of just 0 or 0f instead of f)
 */
function computeBorderColor(horse) {
  const date = lastVisitDate(horse)
  // Get the time (in milliseconds) from the last visit to now
  const timeSinceLastVisit = new Date() - date
  // There are 86,400,000 milliseconds in a day
  const daysSinceLastVisit = Math.floor(timeSinceLastVisit / 86400000)
  /**
   * Declare variables
   * @type {number} weeks       (7 days)
   * @type {number} warnDays    number of days before yellow appears
   * @type {number} alertDays   number of days before red appears
   * @type {number} endHigh       set to 1. Triggers getHex to return a high value close to 255
   * @type {number} endLow      set to 0. Triggers getHex to return a high value close to 0
   * @type {string} borderColor a string representation of a border color in hexidecimal format
   */
  const weeks = 7
  const warnDays = 6 * weeks
  const alertDays = 7 * weeks
  const endHigh = 1
  const endLow = 0
  let borderColor

  if (daysSinceLastVisit < warnDays) {
    /**
     * Sets a gradient between green and yellow
     * 0 days since visit is the low-limit
     * warnDays days since visit is the high-limit
     * For Green->Yellow gradient we want a hex value from 00-ff (0-255) [low-high] returned
     * Using endHi to cause getHex to normalize up from 00 to ff (0-255)
     */
    let hexValue = getHex(daysSinceLastVisit, 0, warnDays, endHigh)
    // Sets the 'borderColor' string.
    // This is useful if you don't want to utilize the rgb() or rgba() method
    borderColor = '#' + hexValue + 'ff00'
  } else if (daysSinceLastVisit < alertDays) {
    /**
     * Sets a gradient between yellow and red
     * warnDays days since visit is the low-limit
     * alertDays days since visit is the high-limit
     * For Yellow->Red gradient we want a hex value from ff-00 (255-0) [low-high] returned
     */
    let hexValue = getHex(daysSinceLastVisit, warnDays, alertDays, endLow)
    // Sets the 'borderColor' string.
    // This is useful if you don't want to utilize the rgb() or rgba() method
    borderColor = '#ff' + hexValue + '00'
  } else {
    // Sets the 'borderColor' string.
    // This is useful if you don't want to utilize the rgb() or rgba() method
    borderColor = '#ff0000'
  }
  /**
   * If the rgb() or rgba() method of setting a border color is preferred, returning just the
   * hexValue can be used instead of borderColor.
   * Some tweaking of the calling function will be needed to make this work properly.
   */
  return borderColor
}

/**
 * Returns a string to set the left and right border colors of a table
 * @param horse       a horse object from the database
 * @returns {string}  a html5 style formatted string to set the border colors
 */
function computeBorderStyle(horse) {
  return `"
  border-left: 10px solid ${computeBorderColor(horse)};
  "`
}

module.exports = { lastVisitDate, computeBorderStyle }
