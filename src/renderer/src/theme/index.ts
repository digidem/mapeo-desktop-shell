import { createTheme } from '@mui/material'

export const MAPEO_BLUE = '#0066FF'
export const MAPEO_ORANGE = '#E86826'
export const OFF_WHITE = '#F6F6F6'
export const WHITE = '#FFFFFF'
export const OFF_BLACK = '#333333'
export const MIDNIGHT_BLUE = '#000033'
export const MID_BLUE = '#19337F'
export const WARNING_RED = '#D92222'
export const GREY_LIGHT = '#EEEEEE'
export const GREY = '#707070'

declare module '@mui/material/styles' {
  interface Theme {
    primary: React.CSSProperties['color']
    background: React.CSSProperties['color']
    foreground: React.CSSProperties['color']
    blueDark: React.CSSProperties['color']
    warningRed: React.CSSProperties['color']
    black: React.CSSProperties['color']
    orange: React.CSSProperties['color']
    white: React.CSSProperties['color']
    grey: {
      light: React.CSSProperties['color']
      main: React.CSSProperties['color']
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    primary: React.CSSProperties['color']
    background: React.CSSProperties['color']
    foreground: React.CSSProperties['color']
    blueDark: React.CSSProperties['color']
    warningRed: React.CSSProperties['color']
    black: React.CSSProperties['color']
    orange: React.CSSProperties['color']
    white: React.CSSProperties['color']
    grey: {
      light: React.CSSProperties['color']
      main: React.CSSProperties['color']
    }
  }
}

const defaultTextStyles = {
  userSelect: 'none' as React.CSSProperties['userSelect'],
}

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: 500,
      color: MIDNIGHT_BLUE,
      ...defaultTextStyles,
    },
    h2: {
      fontSize: 30,
      fontWeight: 400,
      color: MIDNIGHT_BLUE,
      ...defaultTextStyles,
    },
    h3: {
      fontSize: 26,
      fontWeight: 400,
      color: MIDNIGHT_BLUE,
      ...defaultTextStyles,
    },
    h4: {
      fontSize: 24,
      fontWeight: 300,
      color: MIDNIGHT_BLUE,
      ...defaultTextStyles,
    },
    body1: {
      ...defaultTextStyles,
    },
    caption: {
      color: GREY,
      ...defaultTextStyles,
    },
    fontFamily: [
      'Rubik',
      'Roboto',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  background: OFF_WHITE,
  foreground: OFF_BLACK,
  blueDark: MIDNIGHT_BLUE,
  primary: MAPEO_BLUE,
  warningRed: WARNING_RED,
  black: OFF_BLACK,
  orange: MAPEO_ORANGE,
  white: WHITE,
  grey: {
    light: GREY_LIGHT,
    main: GREY,
  },
  palette: {
    primary: { main: MAPEO_BLUE },
    secondary: { main: MID_BLUE },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        // disableElevation: true,
      },
    },
  },
})
