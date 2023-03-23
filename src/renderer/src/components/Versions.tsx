import { IntlSwitchConext } from '../components/IntlProvider'
import { useContext, useState } from 'react'
import { useIntl } from 'react-intl'
import { messages } from './messages'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)
  const intl = useIntl()
  const [lang, setLang] = useContext(IntlSwitchConext)

  return (
    <ul className="versions">
      <li className="electron-version">MESSAGE: {intl.formatMessage(messages.test_message)}</li>
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
      <li className="v8-version">V8 v{versions.v8}</li>

      <h1>{lang}</h1>

      <button onClick={(): void => setLang('en')}>EN</button>
      <button onClick={(): void => setLang('es')}>ES</button>
    </ul>
  )
}

export default Versions
