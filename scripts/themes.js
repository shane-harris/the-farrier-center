'use strict'

const black = 'black'
const coal = '#222'
const charcoal = '#1e1e1e'
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
const neongreen = '#0f0'
const darkgreen = '#006400'
const darkestgreen = '#001000'
const red = '#ff0000'
const blue = '#0000ff'
const darkblue = '#00008b'
const magenta = '#ff00ff'
const indigo = '#4B0082'

const neonred = 'red'
const darkred = '#640000'
const darkestred = '#280000'

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
    dropdownBg: coal,
    dropdownDivider: slate,
    dropdownItemBgHover: yellow,
    dropdownItemText: ivory,
    dropdownItemTextHover: black,
    fg: coal,
    linkHover: yellow,
    loginText: yellow,
    nav: coal,
    navBorder: coal,
    navText: ivory,
    navTextHover: white,
    placeholderText: ivory,
    primaryText: ivory,
    queue: coal,
    queueText: ivory,
    readonlyTextFieldBg: coal
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
    dropdownBg: white,
    dropdownDivider: ivory,
    dropdownItemText: black,
    dropdownItemTextHover: white,
    dropdownItemBgHover: cadetblue,
    fg: white,
    inputBg: white,
    inputBgFocus: lightbluegray,
    linkHover: cadetblue,
    loginText: cadetblue,
    nav: oceanblue,
    navBorder: oceanblue,
    navText: white,
    navTextHover: lightblue,
    placeholderText: ivory,
    primaryText: black,
    queue: turqoisegray,
    queueText: black,
    readonlyTextFieldBg: lightbluegray
  },
  Black: {
    bg: black,
    border: white,
    borderHover: neongreen,
    button: white,
    buttonBorderHover: white,
    buttonHover: black,
    buttonText: black,
    buttonTextHover: white,
    dropdownBg: charcoal,
    dropdownDivider: ivory,
    dropdownItemText: white,
    dropdownItemTextHover: black,
    dropdownItemBgHover: white,
    fg: black,
    inputBg: black,
    inputBgFocus: black,
    nav: black,
    navBorder: ivory,
    navText: ivory,
    navTextHover: white,
    placeholderText: ivory,
    primaryText: white,
    queue: coal,
    queueText: white,
    readonlyTextFieldBg: black
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
    dropdownBg: coffee,
    dropdownDivider: ivory,
    dropdownItemText: ivory,
    dropdownItemTextHover: white,
    dropdownItemBgHover: firgreen,
    fg: darksteel,
    inputBg: darksteel,
    inputBgFocus: blueslate,
    linkHover: firgreen,
    loginText: firgreen,
    nav: coffee,
    navBorder: coffee,
    navText: ivory,
    navTextHover: white,
    placeholderText: ivory,
    primaryText: firgreen,
    queue: coffee,
    queueText: dimwhite,
    readonlyTextFieldBg: dimwhite
  },
  Green: {
    bg: darkestgreen,
    border: neongreen,
    borderHover: darkgreen,
    button: neongreen,
    buttonBorderHover: neongreen,
    buttonHover: darkestgreen,
    buttonText: darkestgreen,
    buttonTextHover: neongreen,
    dropdownBg: darkgreen,
    dropdownDivider: neongreen,
    dropdownItemBgHover: darkgreen,
    dropdownItemText: neongreen,
    dropdownItemTextHover: darkestgreen,
    fg: darkgreen,
    linkHover: neongreen,
    loginText: neongreen,
    nav: darkgreen,
    navBorder: neongreen,
    navText: neongreen,
    navTextHover: neongreen,
    placeholderText: neongreen,
    primaryText: neongreen,
    queue: darkgreen,
    queueText: neongreen,
    readonlyTextFieldBg: darkestgreen
  },
  Red: {
    bg: darkestred,
    border: neonred,
    borderHover: darkred,
    button: neonred,
    buttonBorderHover: neonred,
    buttonHover: darkestred,
    buttonText: darkestred,
    buttonTextHover: neonred,
    dropdownBg: darkred,
    dropdownDivider: neonred,
    dropdownItemBgHover: darkred,
    dropdownItemText: neonred,
    dropdownItemTextHover: darkestred,
    fg: darkred,
    linkHover: neonred,
    loginText: neonred,
    nav: darkred,
    navBorder: neonred,
    navText: neonred,
    navTextHover: neonred,
    placeholderText: neonred,
    primaryText: neonred,
    queue: darkred,
    queueText: neonred,
    readonlyTextFieldBg: darkestred
  }
}

module.exports = themes
