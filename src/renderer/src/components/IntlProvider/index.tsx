import { IntlProvider as ReactIntlProvider } from 'react-intl'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import translations from '../../../translations/messages.json'
import languages from '../../../../common/config/languages.json'
import { useTimeout } from '../../hooks/timerHooks'
import { SplashView } from '../../views/SplashScreen'

const MIN_SPLASH_TIME = 2000
const DEFAULT_LOCALE = 'es'

type AvailableLocales = keyof typeof translations
type SupportedLanguageLocales = keyof typeof languages
interface LanguageName {
  /** IETF BCP 47 langauge tag with region code. */
  locale: SupportedLanguageLocales
  /** Localized name for language */
  nativeName: string
  /** English name for language */
  englishName: string
}

export const translatedLocales = Object.keys(translations) as Array<AvailableLocales>

export const supportedLanguages: LanguageName[] = translatedLocales
  .filter((locale) => {
    const hasAtLeastOneTranslatedString = Object.keys(translations[locale]).length > 0
    // This will show a typescript error if the language name does not exist
    const hasTranslatedLanguageName = languages[locale]
    if (!hasTranslatedLanguageName) {
      console.warn(
        `Locale "${locale}" is not available in Mapeo because we do not have
a language name and translations in \`src/frontend/languages.json\``,
      )
    }
    return hasAtLeastOneTranslatedString && hasTranslatedLanguageName
  })
  .map((locale) => ({
    locale,
    ...languages[locale],
  }))
  .sort((a, b) => {
    return a.englishName.localeCompare(b.englishName)
  })

const isTranslation = (langugage?: string): langugage is AvailableLocales => {
  if (!langugage) return false
  return Object.keys(translations).includes(langugage)
}

type IntlSetContextType = Readonly<[string, Dispatch<SetStateAction<AvailableLocales | undefined>>]>

export const IntlSwitchConext = createContext<IntlSetContextType>([DEFAULT_LOCALE, (): void => {}])

const getSupportedLocale = (locale: SupportedLanguageLocales): keyof typeof languages | undefined => {
  if (supportedLanguages.find((lang) => lang.locale === locale)) return locale as keyof typeof languages
  const nonRegionalLocale = locale.split('-')[0]
  if (supportedLanguages.find(({ locale }) => locale === nonRegionalLocale))
    return nonRegionalLocale as keyof typeof languages
}

export const IntlProvider = ({ children }: { children: ReactNode }): JSX.Element | null => {
  const [appLocale, setAppLocale] = useState<AvailableLocales>()
  const [minLoadTimePassed, setMinLoadTimePassed] = useState(false)

  useTimeout(() => setMinLoadTimePassed(true), MIN_SPLASH_TIME)
  const locale = appLocale || appLocale ? getSupportedLocale(appLocale) : DEFAULT_LOCALE

  const languageCode = locale ? locale.split('-')[0] : null

  // Add fallbacks for non-regional locales (e.g. "en" for "en-GB")
  const localeMessages = {
    ...translations[languageCode as AvailableLocales],
    ...(translations[locale as AvailableLocales] || {}),
  }

  useEffect(() => {
    const setupApp = async (): Promise<void> => {
      const locale = await window.api.getLocale()
      setAppLocale(isTranslation(locale) ? locale : DEFAULT_LOCALE)
    }

    setupApp()
  }, [])

  return !(appLocale && minLoadTimePassed) ? (
    <SplashView />
  ) : (
    <ReactIntlProvider messages={localeMessages} locale={appLocale} defaultLocale={DEFAULT_LOCALE}>
      <IntlSwitchConext.Provider value={[appLocale, setAppLocale]}>{children}</IntlSwitchConext.Provider>
    </ReactIntlProvider>
  )
}
