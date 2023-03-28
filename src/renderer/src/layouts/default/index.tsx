import { ReactNode } from 'react'
import { LanguageSwitcher } from '../../components/LanguageSwitch'

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <LanguageSwitcher />
      {children}
    </div>
  )
}
