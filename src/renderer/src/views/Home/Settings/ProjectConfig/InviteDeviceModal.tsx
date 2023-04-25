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
import { useMapeoDeviceNonMembersListIds } from '@renderer/hooks/useMapeoDeviceList'
import { useMapeoDevice } from '@renderer/hooks/useMapeoDevice'
import { Device } from '@renderer/hooks/stores/mapeoDeviceStore'

const NonMemberPeerCard = ({ id, onClick }: { id: string; onClick: (d: Device) => void }) => {
  const { device } = useMapeoDevice(id)
  return (
    <PeerCard
      title={device.name}
      subtitle={device.deviceId}
      deviceType={device.deviceType}
      onClick={() => onClick(device)}
    />
  )
}

export const InviteDeviceModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { formatMessage: t } = useIntl()
  const theme = useTheme()

  const nonMemberDevices = useMapeoDeviceNonMembersListIds()

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
          <WifiIcon sx={{ marginInlineEnd: spacing.small }} />
          <Text size="small" fontWeight="500" color={theme.blue.dark}>
            MiWifi - 5G
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
            {nonMemberDevices.map((id) => (
              <NonMemberPeerCard key={id} id={id} onClick={() => {}} />
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
