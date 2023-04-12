import { ReactNode } from 'react'
import { LanguageSwitcher } from '../../components/LanguageSwitch'

export const DefaultLayout = ({
  children,
  langBackgroundVarient = 'light',
}: {
  children: ReactNode
  langBackgroundVarient?: 'light' | 'dark'
}) => {
  return (
    <div>
      <LanguageSwitcher langBackgroundVarient={langBackgroundVarient} />
      {children}
    </div>
  )
}
