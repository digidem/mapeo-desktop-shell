import { ReactNode } from 'react'
import { LanguageSwitcher } from '../../components/LanguageSwitch'

export const DefaultLayout = ({
  children,
  themeVarient = 'light',
}: {
  children: ReactNode
  themeVarient?: 'light' | 'dark'
}) => {
  return (
    <div>
      <LanguageSwitcher themeVarient={themeVarient} />
      {children}
    </div>
  )
}
