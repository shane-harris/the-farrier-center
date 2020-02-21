'use strict'

const themes = {
  Dark: {
    bg: '#333',
    border: '#000',
    borderHover: '#ffc535',
    button: '#ffc535',
    buttonBorderHover: '#ffc535',
    buttonHover: '#222',
    buttonText: '#222',
    buttonTextHover: '#ffc535',
    fg: '#222',
    linkHover: '#ffc535',
    nav: '#222',
    primaryText: '#aaa',
    queue: '#222',
    queueText: '#aaa'
  },
  Light: {
    bg: '#fff',
    border: 'cadetblue',
    borderHover: 'lightblue',
    button: 'cadetblue',
    buttonBorderHover: 'cadetblue',
    buttonHover: 'white',
    buttonText: 'white',
    buttonTextHover: 'cadetblue',
    fg: '#fff',
    inputBg: '#fff',
    inputBgFocus: '#eeeef5',
    linkHover: 'cadetblue',
    nav: '#033860',
    primaryText: '#000',
    queue: '#033860',
    queueText: 'white'
  },
  Forest: {
    bg: '#232528',
    border: '#386150',
    borderHover: '#3A2B29',
    button: '#386150',
    buttonBorderHover: '#386150',
    buttonHover: '#3A2B29',
    buttonText: '#3A2B29',
    buttonTextHover: '#386150',
    fg: '#232528',
    inputBg: '#232528',
    inputBgFocus: '#37383B',
    linkHover: '#386150',
    nav: '#3A2B29',
    primaryText: '#386150',
    queue: '#3A2B29',
    queueText: '#aaa'
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
    --nav-color: ${color.nav};
    --primary-text-color: ${color.primaryText};
    --queue-color: ${color.queue};
    --queue-text-color: ${color.queueText};
  }
  `
}

module.exports = { colorStyle, themes: themeList }
