'use strict'

const themes = require('./themes')

/**
 * Returns true if 'char' is an upper case character
 *
 * @param {String} char
 * @returns {Boolean}
 */
const isUpperCase = char => char === char.toUpperCase() && char !== char.toLowerCase()

/**
 * Takes a camelCase string and converts it to kebab-case.
 * Note that this assumes a string starting in a lower-case letter.
 *
 * @example
 * toKebabCase('aVariableName') // -> 'a-variable-name'
 *
 * @param {String} string
 * @returns {String}
 */
const toKebabCase = string =>
  [...string]
    .map(char => {
      if (isUpperCase(char)) {
        return `-${char.toLowerCase()}`
      } else {
        return char
      }
    })
    .join('')

/**
 * Returns a list the names of all available themes, and whether they are selected by the current
 * user.
 *
 * @param {String} userTheme The theme selected by the current user
 * @returns [{ name: {String}, selected: {Boolean} }]
 *
 * @example If there are three available themes, 'Dark', 'Light' and 'Forest', and userTheme is
 * 'Light', this will return the following:
 *
 * [
 *   { name: 'Dark', selected: false },
 *   { name: 'Light', selected: true },
 *   { name: 'Forest', selected: false }
 * ]
 *
 */
const themeList = userTheme =>
  Object.keys(themes).map(theme => {
    return { name: theme, selected: theme === userTheme ? true : false }
  })

/**
 * Convert variable name to css variable declaration based on its value in `theme`
 *
 * @param {Object} theme The theme to take the color value from
 * @param {String} varName The name of a property in `theme` from which to make a css variable
 * declaration
 * @returns {String} A css variable declaration
 */
const cssVar = (theme, varName) => `--${toKebabCase(varName)}-color: '${theme[varName]}';`

/**
 * Returns a CSS style which defines a number of color variables. These variables are loaded
 * dynamically based on the selected theme.
 *
 * @param {*} [theme] The user's selected theme (no parameter indicates that the user has not
 * selected a theme, and the default should be used)
 * @returns {String}
 */
const colorStyle = theme => {
  const color = theme !== undefined && themes[theme] !== undefined ? themes[theme] : themes.Dark
  return `
  :root {
    --bg-color: ${color.bg};
    --border-color: ${color.border};
    --border-hover-color: ${color.borderHover};
    --button-color: ${color.button};
    --button-border-color: ${color.buttonBorderHover};
    --button-hover-color: ${color.buttonHover};
    --button-text-color: ${color.buttonText};
    --button-text-hover-color: ${color.buttonTextHover};
    --fg-color: ${color.fg};
    --input-bg-color: ${color.inputBg};
    --input-bg-focus-color: ${color.inputBgFocus};
    --link-hover-color: ${color.linkHover};
    --login-text-color: ${color.loginText};
    --nav-color: ${color.nav};
    --nav-text-color: ${color.navText};
    --nav-text-hover-color: ${color.navTextHover};
    --primary-text-color: ${color.primaryText};
    --queue-color: ${color.queue};
    --queue-text-color: ${color.queueText};
  }
  `
}

module.exports = { colorStyle, themes: themeList }
