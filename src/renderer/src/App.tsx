import { IntlProvider } from './components/IntlProvider'
import CssBaseline from '@mui/material/CssBaseline'

import { RouteComponentProps, Router } from '@reach/router'
import { IndexView as Index } from './views/Index'
import { MigrationView as Migration } from './views/Migration'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IndexView = (_props: RouteComponentProps) => <Index />
const MigrationView = (_props: RouteComponentProps) => <Migration />

function App(): JSX.Element | null {
  return (
    <IntlProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <MigrationView path="/" />
          <IndexView path="/" />
        </Router>
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
