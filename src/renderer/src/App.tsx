import Versions from './components/Versions'
import { IntlConfig, IntlProvider } from 'react-intl'
import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import * as es from '../translations/es.json'
import * as en from '../translations/en.json'

const DEFAULT_LOCALE = 'es'

type Translations = {
  es: IntlConfig['messages']
  en: IntlConfig['messages']
}

const translations: Translations = { es, en }
type AvailableLocales = keyof typeof translations

const isTranslation = (langugage?: string): langugage is AvailableLocales => {
  if (!langugage) return false
  return Object.keys(translations).includes(langugage)
}

type IntlSetContextType = Readonly<[string, Dispatch<SetStateAction<AvailableLocales>>]>

export const IntlSwitchConext = createContext<IntlSetContextType>([DEFAULT_LOCALE, (): void => {}])

function App(): JSX.Element | null {
  const [lang, setLang] = useState<AvailableLocales>(DEFAULT_LOCALE)
  useEffect(() => {
    setupApp()
  }, [])

  const setupApp = async (): Promise<void> => {
    const locale = await window.api.getLocale()
    setLang(isTranslation(locale) ? locale : DEFAULT_LOCALE)
  }

  console.log({ translations: lang ? translations[lang] : null })

  return lang ? (
    <IntlProvider messages={translations[lang]} locale={lang} defaultLocale={DEFAULT_LOCALE}>
      <IntlSwitchConext.Provider value={[lang, setLang]}>
        <div className="container">
          <Versions></Versions>
          {/* Render other stuff here! */}
        </div>
      </IntlSwitchConext.Provider>
    </IntlProvider>
  ) : null
}

export default App
