import { IntlProvider } from './components/IntlProvider'
import Versions from './components/Versions'

function App(): JSX.Element | null {
  return (
    <IntlProvider>
      <Versions></Versions>
      {/* Render other stuff here! */}
    </IntlProvider>
  )
}

export default App
