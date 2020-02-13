'use strict'

const nav = '#3A2B29'
const bg = '#232528'
const fg = '#3A2B29'
const accent = '#FFC535'
const border = '#386150'
const primaryText = '#386150'
const secondaryText = '#000'
const tertiaryText = '#fff'

module.exports = () => {
  return `
  :root {
    --nav-color: ${nav};
    --bg-color: ${bg};
    --fg-color: ${fg};
    --accent-color: ${accent};
    --border-color: ${border};
    --primary-text-color: ${primaryText};
    --secondary-text-color: ${secondaryText};
    --tertiary-text-color: ${tertiaryText};
  }
  `
}
