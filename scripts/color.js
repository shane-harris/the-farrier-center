'use strict'

const black = 'black'
const coal = '#222'
const slate = '#333'
const ivory = '#aaa'
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

const themes = {
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
    primaryText: black,
    queue: oceanblue,
    queueText: white
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
    primaryText: firgreen,
    queue: coffee,
    queueText: ivory
  }
}

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
    --primary-text-color: ${color.primaryText};
    --queue-color: ${color.queue};
    --queue-text-color: ${color.queueText};
  }
  `
}

module.exports = { colorStyle, themes: themeList }
