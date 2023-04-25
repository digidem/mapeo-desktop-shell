import { createTheme } from '@mui/material'
import React from 'react'

export const MAPEO_BLUE = '#0066FF'
export const MAPEO_ORANGE = '#E86826'
export const OFF_WHITE = '#F6F6F6'
export const WHITE = '#FFFFFF'
export const OFF_BLACK = '#333333'
export const MIDNIGHT_BLUE = '#000033'
export const MID_BLUE = '#19337F'
export const WARNING_RED = '#D92222'
export const GREY_LIGHT = '#E6E6E6'
export const GREY = '#707070'
export const GREY_BLUE = '#CCCCD6'
export const GREEN = '#59A553'

declare module '@mui/material/styles' {
  interface Theme {
    primary: React.CSSProperties['color']
    background: React.CSSProperties['color']
    foreground: React.CSSProperties['color']
    blueDark: React.CSSProperties['color']
    warningRed: React.CSSProperties['color']
    successGreen: React.CSSProperties['color']
    black: React.CSSProperties['color']
    orange: React.CSSProperties['color']
    white: React.CSSProperties['color']
    grey: {
      light: React.CSSProperties['color']
      main: React.CSSProperties['color']
      mid: React.CSSProperties['color']
    }
    blue: {
      main: React.CSSProperties['color']
      mid: React.CSSProperties['color']
      dark: React.CSSProperties['color']
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    primary: React.CSSProperties['color']
    background: React.CSSProperties['color']
    foreground: React.CSSProperties['color']
    blueDark: React.CSSProperties['color']
    warningRed: React.CSSProperties['color']
    successGreen: React.CSSProperties['color']
    black: React.CSSProperties['color']
    orange: React.CSSProperties['color']
    white: React.CSSProperties['color']
    grey: {
      light: React.CSSProperties['color']
      main: React.CSSProperties['color']
      mid: React.CSSProperties['color']
    }
    blue: {
      main: React.CSSProperties['color']
      mid: React.CSSProperties['color']
      dark: React.CSSProperties['color']
    }
  }
}

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: 700,
      color: MIDNIGHT_BLUE,
    },
    h2: {
      fontSize: 30,
      fontWeight: 400,
      color: MIDNIGHT_BLUE,
    },
    h3: {
      fontSize: 26,
      fontWeight: 400,
      color: MIDNIGHT_BLUE,
    },
    h4: {
      fontSize: 24,
      fontWeight: 300,
      color: MIDNIGHT_BLUE,
    },
    h5: {
      fontSize: 18,
      fontWeight: 300,
      color: MIDNIGHT_BLUE,
    },
    body1: {},
    caption: {
      color: GREY,
      fontSize: 14,
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
  blue: {
    main: MAPEO_BLUE,
    mid: MID_BLUE,
    dark: MIDNIGHT_BLUE,
  },
  primary: MAPEO_BLUE,
  warningRed: WARNING_RED,
  black: OFF_BLACK,
  orange: MAPEO_ORANGE,
  white: WHITE,
  successGreen: GREEN,
  grey: {
    light: GREY_LIGHT,
    main: GREY,
    mid: GREY_BLUE,
  },
  palette: {
    primary: { main: MAPEO_BLUE },
    secondary: { main: MID_BLUE },
    warning: { main: WARNING_RED },
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
