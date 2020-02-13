'use strict'

const nav = '#3A2B29'
const bg = '#232528'
const fg = '#3A2B29'
const accent = '#FFC535'
const border = '#386150'
const fgText = '#386150'

module.exports = () => {
  return `
  :root {
    --nav-color: ${nav};
    --bg-color: ${bg};
    --fg-color: ${fg};
    --accent-color: ${accent};
    --border-color: ${border};
    --fg-text-color: ${fgText};
  }
  `
}
