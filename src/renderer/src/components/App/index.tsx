import { ThemeProvider } from '@mui/system'

import { IntlProvider } from '../IntlProvider'
import { Router } from '../Router'
import { theme, OFF_BLACK as black, OFF_WHITE as white } from '../../theme'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { fontFace } from './fontface'

const GLOBAL_STYLES = {
  body: {
    color: black,
    backgroundColor: white,
    fontFamily: `Rubik, Roboto, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', sans-serif;`,
  },
  ...fontFace,
}

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={GLOBAL_STYLES} />
      <IntlProvider>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </IntlProvider>
    </>
  )
}

export default App
