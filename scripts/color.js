'use strict'

const themes = {
  Forest: {
    nav: '#3A2B29',
    bg: '#232528',
    fg: '#3A2B29',
    accent: '#FFC535',
    border: '#386150',
    primaryText: '#386150',
    secondaryText: '#000',
    tertiaryText: '#fff'
  },
  Dark: {
    nav: '#222',
    bg: '#333',
    fg: '#222',
    accent: '#FFC535',
    border: '#000',
    primaryText: '#aaa',
    secondaryText: '#000',
    tertiaryText: '#fff'
  }
}

module.exports = theme => {
  const color = themes[theme]
  return `
  :root {
    --nav-color: ${color.nav};
    --bg-color: ${color.bg};
    --fg-color: ${color.fg};
    --accent-color: ${color.accent};
    --border-color: ${color.border};
    --primary-text-color: ${color.primaryText};
    --secondary-text-color: ${color.secondaryText};
    --tertiary-text-color: ${color.tertiaryText};
  }
  `
}
