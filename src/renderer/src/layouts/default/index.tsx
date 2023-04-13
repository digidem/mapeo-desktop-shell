import { ReactNode, useState } from 'react'
import { LanguageSwitcher } from '../../components/LanguageSwitch'
import { Box, SxProps, Tooltip } from '@mui/material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { Link, useLocation } from 'react-router-dom'
import { defineMessages, useIntl } from 'react-intl'

export const DefaultLayout = ({
  children,
  langBackgroundVarient = 'light',
  sx,
}: {
  children: ReactNode
  langBackgroundVarient?: 'light' | 'dark'
  sx?: SxProps
}) => {
  const location = useLocation()
  const intl = useIntl()
  const [isHovered, setIsHovered] = useState(false)

  const handleClose = () => {
    setIsHovered(false)
  }

  const handleOpen = () => {
    setIsHovered(true)
  }

  return (
    <Box minHeight="100vh" minWidth="100vw" sx={sx}>
      {location.pathname !== '/' ? (
        <Tooltip
          title={intl.formatMessage(messages.exitTesting)}
          enterDelay={0}
          leaveDelay={200}
          placement="right"
          open={isHovered}
          onClose={handleClose}
          onOpen={handleOpen}
        >
          <Box
            sx={{ position: 'fixed', top: 1, left: 4, m: 1 }}
            onMouseOver={handleOpen}
            onMouseOut={handleClose}
          >
            <Link to="/">
              <MenuOpenIcon sx={{ cursor: 'pointer' }} />
            </Link>
          </Box>
        </Tooltip>
      ) : null}
      <LanguageSwitcher langBackgroundVarient={langBackgroundVarient} />
      {children}
    </Box>
  )
}

const messages = defineMessages({
  exitTesting: {
    id: 'common.defaultLayout.exitTesting',
    defaultMessage: 'Exit testing and return to navigation',
  },
})
