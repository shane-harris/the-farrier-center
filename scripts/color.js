'use strict'

const color = {
  nav: '#222',
  bg: '#333',
  fg: '#222',
  accent: '#FFC535',
  border: '#000',
  primaryText: '#aaa',
  secondaryText: '#000',
  tertiaryText: '#fff'
}

module.exports = () => {
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
