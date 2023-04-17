import { ReactNode } from 'react'
import { Box, SxProps } from '@mui/material'
import { LanguageSwitcher } from '../../components/LanguageSwitch'

export const DefaultLayout = ({
  children,
  langBackgroundVarient = 'light',
  sx,
}: {
  children: ReactNode
  langBackgroundVarient?: 'light' | 'dark'
  sx?: SxProps
}) => {
  return (
    <Box minHeight="100vh" minWidth="100vw" sx={sx}>
      <LanguageSwitcher langBackgroundVarient={langBackgroundVarient} />
      {children}
    </Box>
  )
}
