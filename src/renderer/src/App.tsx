import { IntlProvider } from './components/IntlProvider'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import { Router } from './components/Router'

function App(): JSX.Element {
  return (
    <IntlProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
