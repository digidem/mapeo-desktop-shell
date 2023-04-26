import * as React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi'
import { Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'

import { Text } from '../Text'

export const Layout = ({
  children,
  open,
  primaryActionButton,
  secondaryActionButton,
  onClose,
  onCloseEnd,
}: React.PropsWithChildren<{
  open: boolean
  onClose: () => void
  primaryActionButton: React.ReactNode
  secondaryActionButton?: React.ReactNode
  onCloseEnd: () => void
}>) => {
  const theme = useTheme()
  const { formatMessage: t } = useIntl()

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
        onClose()
      }}
      TransitionProps={{
        onExited: onCloseEnd,
      }}
      fullScreen
      sx={{ margin: '48px' }}
    >
      <Row
        borderBottom={`1px solid ${theme.grey.light}`}
        padding={spacing.large}
        justifyContent="space-between"
        alignItems="center"
      >
        <DialogTitle fontWeight="600" fontSize="24px" sx={{ padding: 0 }}>
          {t(m.title)}
        </DialogTitle>
        <Row>
          <WifiIcon sx={{ marginInlineEnd: spacing.small }} />
          <Text size="small" fontWeight="500" color={theme.blue.dark}>
            MiWifi - 5G
          </Text>
        </Row>
      </Row>
      <DialogContent sx={{ display: 'flex', padding: 0 }}>{children}</DialogContent>
      <DialogActions sx={{ borderTop: `1px solid ${theme.grey.light}`, paddingX: spacing.large }}>
        <Row spacing={spacing.large} alignItems="center">
          {secondaryActionButton}
          {primaryActionButton}
        </Row>
      </DialogActions>
    </Dialog>
  )
}

const m = defineMessages({
  title: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.Layout.title',
    defaultMessage: 'Invite Device',
  },
})
