import * as React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import styled from '@emotion/styled'
import { Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import WifiIcon from '@mui/icons-material/Wifi'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'

import { Text } from './Text'
import { Button } from './Button'
import { PeerCard } from './PeerCard'
import { PressableText } from './PressableText'
import { Peer } from '.'

interface Props {
  open: boolean
  onClose: () => void
}

export const InviteDeviceModal = ({ open, onClose }: Props) => {
  const { formatMessage: t } = useIntl()
  const theme = useTheme()

  const [peers] = React.useState<Peer[]>(() => {
    return Array(10)
      .fill(null)
      .map((_, index) => {
        const displayedNumber = index + 1
        const deviceType = Math.random() > 0.75 ? 'desktop' : 'mobile'

        return {
          id: `peer-${displayedNumber}`,
          deviceType,
          name: `Peer ${displayedNumber} `,
          deviceId: `${deviceType === 'desktop' ? 'Desktop' : 'Android'} Device ${displayedNumber}`,
        }
      })
  })

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
        onClose()
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
          {/* TODO: Use actual Wifi info */}
          <WifiIcon sx={{ marginInlineEnd: spacing.small }} />
          <Text size="small" fontWeight="500" color={theme.blue.dark}>
            SpicyWifi - 5G
          </Text>
        </Row>
      </Row>
      <DialogContent sx={{ display: 'flex', padding: 0 }}>
        <Row flex={1}>
          <Column padding={spacing.large} maxWidth="400px" spacing={spacing.medium}>
            <Text size="medium" fontWeight="500">
              {t(m.selectDevice)}
            </Text>
            <Text size="medium">{t(m.noDevicePrompt)}</Text>
            <StyledList>
              <Column spacing={spacing.medium}>
                <li>
                  <Text size="medium">{t(m.noDeviceSuggestion1)}</Text>
                </li>
                <li>
                  <Text size="medium">{t(m.noDeviceSuggestion2)}</Text>
                </li>
              </Column>
            </StyledList>
            <Row>
              {/* TODO: Probably should be a link */}
              <PressableText onClick={() => {}} Icon={LaunchIcon} iconPosition="end">
                {t(m.learnMore)}
              </PressableText>
            </Row>
          </Column>
          <Column
            sx={{ backgroundColor: theme.background, overflow: 'auto', padding: spacing.large }}
            flex={1}
            spacing={spacing.medium}
          >
            {peers.map((p) => (
              <PeerCard
                key={p.id}
                title={p.name}
                subtitle={p.deviceId}
                deviceType={p.deviceType}
                onClick={() => {}}
              />
            ))}
          </Column>
        </Row>
      </DialogContent>
      <DialogActions sx={{ borderTop: `1px solid ${theme.grey.light}`, paddingX: spacing.large }}>
        <Button noBorder onClick={onClose}>
          {t(m.cancel)}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const StyledList = styled.ul(`
  list-style: disc;
  padding-inline-start: ${spacing.large};
`)

const m = defineMessages({
  title: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.title',
    defaultMessage: 'Invite Device',
  },
  selectDevice: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.selectDevice',
    defaultMessage: 'Select a device to invite',
  },
  noDevicePrompt: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.noDevicePrompt',
    defaultMessage: 'Not seeing a device?',
  },
  noDeviceSuggestion1: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.noDeviceSuggestion1',
    defaultMessage: 'Make sure both devices are on the same wifi network',
  },
  noDeviceSuggestion2: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.noDeviceSuggestion2',
    defaultMessage: 'Make sure both devices are on the same version of Mapeo',
  },
  learnMore: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.learnMore',
    defaultMessage: 'Learn more',
  },
  cancel: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.cancel',
    defaultMessage: 'Cancel',
  },
})
