'use strict'

const black = 'black'
const coal = '#222'
const slate = '#333'
const ivory = '#aaa'
const dimwhite = '#ddd'
const white = 'white'
const yellow = '#ffc535'
const cadetblue = 'cadetblue'
const lightblue = 'lightblue'
const lightbluegray = '#eeeef5'
const oceanblue = '#033860'
const coffee = '#3a2b29'
const firgreen = '#386150'
const darksteel = '#232528'
const blueslate = '#37383b'
const turqoisegray = '#7d9fa0'

const themes = {
  Black: {
    nav: '#1e1e1e',
    bg: '#000000',
    fg: '#000000',
    accent: '#00ff00',
    button: '#ffffff',
    buttonText: '#000000',
    buttonHover: '#000000',
    buttonTextHover: '#ffffff',
    buttonBorderHover: '#ffffff',
    border: '#ffffff',
    borderHover: '#00ff00',
    queue: '#222',
    queueText: '#ffffff',
    primaryText: '#ffffff',
    secondaryText: '#000',
    tertiaryText: '#00ff00'
  },
  Dark: {
    bg: slate,
    border: black,
    borderHover: yellow,
    button: yellow,
    buttonBorderHover: yellow,
    buttonHover: coal,
    buttonText: coal,
    buttonTextHover: yellow,
    fg: coal,
    linkHover: yellow,
    loginText: yellow,
    nav: coal,
    navText: ivory,
    navTextHover: white,
    primaryText: ivory,
    queue: coal,
    queueText: ivory
  },
  Light: {
    bg: white,
    border: cadetblue,
    borderHover: lightblue,
    button: cadetblue,
    buttonBorderHover: cadetblue,
    buttonHover: white,
    buttonText: white,
    buttonTextHover: cadetblue,
    fg: white,
    inputBg: white,
    inputBgFocus: lightbluegray,
    linkHover: cadetblue,
    loginText: cadetblue,
    nav: oceanblue,
    navText: white,
    navTextHover: lightblue,
    primaryText: black,
    queue: turqoisegray,
    queueText: black
  },
  Forest: {
    bg: darksteel,
    border: firgreen,
    borderHover: coffee,
    button: firgreen,
    buttonBorderHover: firgreen,
    buttonHover: coffee,
    buttonText: coffee,
    buttonTextHover: firgreen,
    fg: darksteel,
    inputBg: darksteel,
    inputBgFocus: blueslate,
    linkHover: firgreen,
    loginText: firgreen,
    nav: coffee,
    navText: ivory,
    navTextHover: white,
    primaryText: firgreen,
    queue: coffee,
    queueText: dimwhite
  }
}

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
 * Returns a CSS style which defines a number of color variables. These variables are loaded
 * dynamically based on the selected theme.
 *
 * @param {*} [theme] The user's selected theme (no parameter indicates that the user has not
 * selected a theme, and the default should be used)
 * @returns {String}
 */
const colorStyle = theme => {
  const color = theme !== undefined ? themes[theme] : themes.Dark
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
