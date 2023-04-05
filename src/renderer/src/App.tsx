import { IntlProvider } from './components/IntlProvider'
import CssBaseline from '@mui/material/CssBaseline'

import { RouteComponentProps, Router } from '@reach/router'
import { IndexView as Index } from './views/Index'
import { MigrationView as Migration } from './views/Migration'
import GlobalStyles from '@mui/material/GlobalStyles'
import { OFF_BLACK as black, theme, OFF_WHITE as white } from './theme'
import { ThemeProvider } from '@mui/system'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MigrationView = (_props: RouteComponentProps) => <Migration />

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
        <Router>
          <MigrationView path="/" />
          {/* <IndexView path="/" /> */}
        </Router>
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
