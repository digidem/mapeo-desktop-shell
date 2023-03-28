import { IntlProvider } from './components/IntlProvider'

import { RouteComponentProps, Router } from '@reach/router'
import { IndexView as Index } from './views/Index'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IndexView = (_props: RouteComponentProps) => <Index />

function App(): JSX.Element | null {
  return (
    <IntlProvider>
      <Router>
        <IndexView path="/" />
      </Router>
    </IntlProvider>
  )
}

export default App
