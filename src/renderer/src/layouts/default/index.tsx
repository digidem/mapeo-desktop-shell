import { ReactNode } from 'react'
import { LanguageSwitcher } from '../../components/LanguageSwitch'
import { Box, SxProps } from '@mui/material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { Link, useLocation } from 'react-router-dom'

export const DefaultLayout = ({
  children,
  themeVarient = 'light',
  sx,
}: {
  children: ReactNode
  themeVarient?: 'light' | 'dark'
  sx?: SxProps
}) => {
  const location = useLocation()
  return (
    <Box minHeight="100vh" minWidth="100vw" sx={sx}>
      {location.pathname !== '/' ? (
        <Link to="/">
          <MenuOpenIcon sx={{ position: 'fixed', top: 1, left: 4, cursor: 'pointer' }} />
        </Link>
      ) : null}
      <LanguageSwitcher themeVarient={themeVarient} />
      {children}
    </Box>
  )
}
