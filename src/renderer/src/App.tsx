import { IntlProvider } from './components/IntlProvider'
import CssBaseline from '@mui/material/CssBaseline'

import { RouteComponentProps, Router } from '@reach/router'
import { IndexView as Index } from './views/Index'
import GlobalStyles from '@mui/material/GlobalStyles'
import { OFF_BLACK as black, OFF_WHITE as white } from './theme'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IndexView = (_props: RouteComponentProps) => <Index />
const MigrationView = (_props: RouteComponentProps) => <Migration />

function App(): JSX.Element | null {
  return (
    <IntlProvider>
      <GlobalStyles
        styles={{
          color: black,
          backgroundColor: white,
        }}
      ></GlobalStyles>
      <Router>
        <IndexView path="/" />
      </Router>
    </IntlProvider>
  )
}

export default App
