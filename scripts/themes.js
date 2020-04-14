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
const lightbrown = '#be9063'
const darknavy = '#14172b'
const flatgrey = '#585c5a'
const graywood = '#a4978e'

const neonred = 'red'
const darkred = '#640000'
const darkestred = '#280000'

const neonyellow = '#FFFF00'
const darkyellow = '#a8a800'
const darkestyellow = '#646400'

const iceblue = '#F0F8FF'
const skyblue = '#00BFFF'
const royalblue = '#4169E1'

const lightestpink = '#FFF3F5'
const pink = '#FF69B4'
const darkpink = '#9a4d67'

const orange = '#ffa500'
const darkorange = '#a96a00'
const darkestorange = '#925a00'

const neonpurple = '#FF00FF'
const darkpurple = '#8b008b'
const darkestpurple = '#4d004d'

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
    readonlyTextFieldBg: coal,
    shoeingCard: yellowgray,
    shoeingCardBody: charcoal
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
    readonlyTextFieldBg: lightbluegray,
    shoeingCard: white,
    shoeingCardBody: white
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
    readonlyTextFieldBg: black,
    shoeingCard: slate
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
  'Dark Rustic': {
    bg: darknavy,
    border: ivory,
    borderHover: lightbrown,
    button: graywood,
    buttonBorderHover: lightbrown,
    buttonHover: darknavy,
    buttonText: white,
    buttonTextHover: ivory,
    dropdownBg: flatgrey,
    dropdownDivider: graywood,
    dropdownItemBgHover: ivory,
    dropdownItemText: graywood,
    dropdownItemTextHover: white,
    fg: darknavy,
    linkHover: graywood,
    loginText: graywood,
    nav: flatgrey,
    navBorder: ivory,
    navText: ivory,
    navTextHover: white,
    placeholderText: ivory,
    primaryText: ivory,
    queue: darknavy,
    queueText: ivory,
    readonlyTextFieldBg: darknavy
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
  },
  Yellow: {
    bg: darkestyellow,
    border: neonyellow,
    borderHover: darkyellow,
    button: neonyellow,
    buttonBorderHover: neonyellow,
    buttonHover: darkestyellow,
    buttonText: darkestyellow,
    buttonTextHover: neonyellow,
    dropdownBg: darkyellow,
    dropdownDivider: neonyellow,
    dropdownItemBgHover: darkyellow,
    dropdownItemText: neonyellow,
    dropdownItemTextHover: darkestyellow,
    fg: darkyellow,
    linkHover: neonyellow,
    loginText: neonyellow,
    nav: darkyellow,
    navBorder: neonyellow,
    navText: neonyellow,
    navTextHover: neonyellow,
    placeholderText: neonyellow,
    primaryText: neonyellow,
    queue: darkyellow,
    queueText: neonyellow,
    readonlyTextFieldBg: darkestyellow
  },
  'Pastel Blue': {
    bg: royalblue,
    border: iceblue,
    borderHover: skyblue,
    button: iceblue,
    buttonBorderHover: iceblue,
    buttonHover: royalblue,
    buttonText: royalblue,
    buttonTextHover: iceblue,
    dropdownBg: skyblue,
    dropdownDivider: iceblue,
    dropdownItemBgHover: skyblue,
    dropdownItemText: iceblue,
    dropdownItemTextHover: royalblue,
    fg: skyblue,
    linkHover: iceblue,
    loginText: iceblue,
    nav: skyblue,
    navBorder: iceblue,
    navText: iceblue,
    navTextHover: iceblue,
    placeholderText: iceblue,
    primaryText: iceblue,
    queue: skyblue,
    queueText: iceblue,
    readonlyTextFieldBg: royalblue
  },
  Pink: {
    bg: darkpink,
    border: lightestpink,
    borderHover: pink,
    button: lightestpink,
    buttonBorderHover: lightestpink,
    buttonHover: darkpink,
    buttonText: darkpink,
    buttonTextHover: lightestpink,
    dropdownBg: pink,
    dropdownDivider: lightestpink,
    dropdownItemBgHover: pink,
    dropdownItemText: lightestpink,
    dropdownItemTextHover: darkpink,
    fg: pink,
    linkHover: lightestpink,
    loginText: lightestpink,
    nav: pink,
    navBorder: lightestpink,
    navText: lightestpink,
    navTextHover: lightestpink,
    placeholderText: lightestpink,
    primaryText: lightestpink,
    queue: pink,
    queueText: lightestpink,
    readonlyTextFieldBg: darkpink
  },
  Orange: {
    bg: darkestorange,
    border: orange,
    borderHover: darkorange,
    button: orange,
    buttonBorderHover: orange,
    buttonHover: darkestorange,
    buttonText: darkestorange,
    buttonTextHover: orange,
    dropdownBg: darkorange,
    dropdownDivider: orange,
    dropdownItemBgHover: darkorange,
    dropdownItemText: orange,
    dropdownItemTextHover: darkestorange,
    fg: darkorange,
    linkHover: orange,
    loginText: orange,
    nav: darkorange,
    navBorder: orange,
    navText: orange,
    navTextHover: orange,
    placeholderText: orange,
    primaryText: orange,
    queue: darkorange,
    queueText: orange,
    readonlyTextFieldBg: darkestorange
  },
  Purple: {
    bg: darkestpurple,
    border: neonpurple,
    borderHover: darkpurple,
    button: neonpurple,
    buttonBorderHover: neonpurple,
    buttonHover: darkestpurple,
    buttonText: darkestpurple,
    buttonTextHover: neonpurple,
    dropdownBg: darkpurple,
    dropdownDivider: neonpurple,
    dropdownItemBgHover: darkpurple,
    dropdownItemText: neonpurple,
    dropdownItemTextHover: darkestpurple,
    fg: darkpurple,
    linkHover: neonpurple,
    loginText: neonpurple,
    nav: darkpurple,
    navBorder: neonpurple,
    navText: neonpurple,
    navTextHover: neonpurple,
    placeholderText: neonpurple,
    primaryText: neonpurple,
    queue: darkpurple,
    queueText: neonpurple,
    readonlyTextFieldBg: darkestpurple
  }
}

module.exports = themes
