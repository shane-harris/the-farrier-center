'use strict'

const themes = {
  Dark: {
    nav: '#222',
    bg: '#333',
    fg: '#222',
    accent: '#ffc535',
    button: '#ffc535',
    buttonText: '#222',
    buttonHover: '#222',
    buttonTextHover: '#ffc535',
    buttonBorderHover: '#ffc535',
    border: '#000',
    borderHover: '#ffc535',
    queue: '#222',
    queueText: '#aaa',
    primaryText: '#aaa'
  },
  Light: {
    nav: '#033860',
    bg: '#fff',
    fg: '#fff',
    accent: 'cadetblue',
    button: 'cadetblue',
    buttonText: 'white',
    buttonHover: 'white',
    buttonTextHover: 'cadetblue',
    buttonBorderHover: 'cadetblue',
    border: 'cadetblue',
    borderHover: 'lightblue',
    queue: '#033860',
    queueText: 'white',
    primaryText: '#000',
    inputBg: '#fff',
    inputBgFocus: '#eeeef5'
  },
  Forest: {
    nav: '#3A2B29',
    bg: '#232528',
    fg: '#232528',
    accent: '#386150',
    button: '#386150',
    buttonText: '#3A2B29',
    buttonHover: '#3A2B29',
    buttonTextHover: '#386150',
    buttonBorderHover: '#386150',
    border: '#386150',
    borderHover: '#3A2B29',
    queue: '#3A2B29',
    queueText: '#aaa',
    primaryText: '#386150',
    inputBg: '#232528',
    inputBgFocus: '#37383B'
  }
}

const themeList = userTheme =>
  Object.keys(themes).map(theme => {
    return { name: theme, selected: theme === userTheme ? true : false }
  })

const colorStyle = theme => {
  const color = theme !== undefined ? themes[theme] : themes.Dark
  return `
  :root {
    --nav-color: ${color.nav};
    --bg-color: ${color.bg};
    --fg-color: ${color.fg};
    --accent-color: ${color.accent};
    --border-color: ${color.border};
    --border-hover-color: ${color.borderHover};
    --button-color: ${color.button};
    --button-text-color: ${color.buttonText};
    --button-border-color: ${color.buttonBorderHover};
    --button-text-hover-color: ${color.buttonTextHover};
    --button-hover-color: ${color.buttonHover};
    --primary-text-color: ${color.primaryText};
    --queue-color: ${color.queue};
    --queue-text-color: ${color.queueText};
    --input-bg-color: ${color.inputBg};
    --input-bg-focus-color: ${color.inputBgFocus}
  }
  `
}

module.exports = { colorStyle, themes: themeList }
