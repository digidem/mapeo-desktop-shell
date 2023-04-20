import { ThemeProvider } from '@mui/system'

import { IntlProvider } from './components/IntlProvider'
import { Router } from './components/Router'
import { theme } from './theme'

function App() {
  return (
    <IntlProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
