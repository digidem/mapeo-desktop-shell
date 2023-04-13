import { IntlProvider } from './components/IntlProvider'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { OFF_BLACK as black, theme, OFF_WHITE as white } from './theme'
import { ThemeProvider } from '@mui/system'
import { Router } from './components/Router'

function App(): JSX.Element | null {
  return (
    <IntlProvider>
      <CssBaseline />
      <GlobalStyles
        styles={{
          color: black,
          backgroundColor: white,
        }}
      ></GlobalStyles>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
