import { defineMessages, useIntl } from 'react-intl'
import styled from '@emotion/styled'
import { useTheme } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'
import { useMapeoDeviceNonMembersListIds } from '@renderer/hooks/useMapeoDeviceList'
import { useMapeoDevice } from '@renderer/hooks/useMapeoDevice'
import { Device } from '@renderer/hooks/stores/mapeoDeviceStore'

import { Text } from '../Text'
import { PeerCard } from '../PeerCard'
import { PressableText } from '../PressableText'

export const SelectDevice = ({ onDeviceClick }: { onDeviceClick: (deviceId: string) => void }) => {
  const { formatMessage: t } = useIntl()
  const theme = useTheme()
  const nonMemberDeviceIds = useMapeoDeviceNonMembersListIds()

  return (
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
        {nonMemberDeviceIds.map((id) => (
          <NonMemberPeerCard key={id} id={id} onClick={() => onDeviceClick(id)} />
        ))}
      </Column>
    </Row>
  )
}

const NonMemberPeerCard = ({ id, onClick }: { id: string; onClick: () => void }) => {
  const { device } = useMapeoDevice(id)
  return (
    <PeerCard
      title={device.name}
      subtitle={device.deviceId}
      deviceType={device.deviceType}
      onClick={onClick}
    />
  )
}

const StyledList = styled.ul(`
  list-style: disc;
  padding-inline-start: ${spacing.large};
`)

const m = defineMessages({
  selectDevice: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SelectDevice.selectDevice',
    defaultMessage: 'Select a device to invite',
  },
  noDevicePrompt: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SelectDevice.noDevicePrompt',
    defaultMessage: 'Not seeing a device?',
  },
  noDeviceSuggestion1: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SelectDevice.noDeviceSuggestion1',
    defaultMessage: 'Make sure both devices are on the same wifi network',
  },
  noDeviceSuggestion2: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SelectDevice.noDeviceSuggestion2',
    defaultMessage: 'Make sure both devices are on the same version of Mapeo',
  },
  learnMore: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SelectDevice.learnMore',
    defaultMessage: 'Learn more',
  },
})
