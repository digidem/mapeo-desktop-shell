import { IntlConfig, IntlProvider as ReactIntlProvider } from 'react-intl'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import * as es from '../../../translations/es.json'
import * as en from '../../../translations/en.json'

const DEFAULT_LOCALE = 'es'

type Translations = {
  es: IntlConfig['messages']
  en: IntlConfig['messages']
}

const translations: Translations = { es, en }

type AvailableLocales = keyof typeof translations | undefined

const isTranslation = (langugage?: string): langugage is AvailableLocales => {
  if (!langugage) return false
  return Object.keys(translations).includes(langugage)
}

type IntlSetContextType = Readonly<[string, Dispatch<SetStateAction<AvailableLocales>>]>

export const IntlSwitchConext = createContext<IntlSetContextType>([DEFAULT_LOCALE, (): void => {}])

export const IntlProvider = ({ children }: { children: ReactNode }): JSX.Element | null => {
  const [lang, setLang] = useState<AvailableLocales>()

  useEffect(() => {
    const setupApp = async (): Promise<void> => {
      const locale = await window.api.getLocale()
      setLang(isTranslation(locale) ? locale : DEFAULT_LOCALE)
    }

    setupApp()
  }, [])

  return lang ? (
    <ReactIntlProvider messages={translations[lang]} locale={lang} defaultLocale={DEFAULT_LOCALE}>
      <IntlSwitchConext.Provider value={[lang, setLang]}>{children}</IntlSwitchConext.Provider>
    </ReactIntlProvider>
  ) : null
}
