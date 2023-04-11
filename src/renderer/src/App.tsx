import { IntlProvider } from './components/IntlProvider'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import { Router } from './components/Router'
import GlobalStyles from '@mui/material/GlobalStyles'
import { OFF_BLACK as black, OFF_WHITE as white } from './theme'

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
