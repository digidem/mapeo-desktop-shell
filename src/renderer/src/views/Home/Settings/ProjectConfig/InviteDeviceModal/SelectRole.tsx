import { defineMessages, useIntl } from 'react-intl'
import { useTheme } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'
import { useMapeoDevice } from '@renderer/hooks/useMapeoDevice'
import { Role } from '@renderer/hooks/stores/mapeoDeviceStore'

import desktopImageUrl from '../../../../../../assets/desktop.png'
import mobileImageUrl from '../../../../../../assets/mobile.png'
import { Text } from '../Text'
import { Button } from '../Button'

export const SelectRole = ({
  deviceId,
  onRoleSelect,
}: {
  deviceId: string
  onRoleSelect: (role: Role) => void
}) => {
  const { formatMessage: t } = useIntl()

  return (
    <Column flex={1} spacing={spacing.large} padding={spacing.large} overflow="auto">
      <Text size="medium" fontWeight="500">
        {t(m.selectRole)}
      </Text>
      <Row>
        <RoleSelectionButton
          role="participant"
          deviceId={deviceId}
          title={t(m.participantTitle)}
          description={t(m.participantDescription)}
          onClick={() => onRoleSelect('participant')}
        />
      </Row>
      <Row>
        <RoleSelectionButton
          role="coordinator"
          deviceId={deviceId}
          title={t(m.coordinatorTitle)}
          description={t(m.coordinatorDescription)}
          onClick={() => {}}
        />
      </Row>
    </Column>
  )
}

const RoleSelectionButton = ({
  deviceId,
  onClick,
  title,
  description,
  role,
}: {
  deviceId: string
  onClick: () => void
  title: string
  description: string
  role: Role
}) => {
  const theme = useTheme()

  const { device } = useMapeoDevice(deviceId)

  const RoleIcon = role === 'coordinator' ? ManageAccountsIcon : GroupIcon

  return (
    <Button onClick={onClick} variant="outlined" sx={{ padding: 0 }}>
      <Column>
        <Row
          spacing={spacing.large}
          justifyContent="center"
          alignItems="center"
          paddingY={spacing.large}
          paddingX="72px"
        >
          <RoleIcon sx={{ fontSize: '48px' }} htmlColor={theme.black} />
          <Column maxWidth="400px" justifyContent="flex-start" textAlign="start">
            <Text size="large" fontWeight="500">
              {title}
            </Text>
            <Text size="medium">{description}</Text>
          </Column>
        </Row>
        <Row
          spacing={spacing.medium}
          alignItems="center"
          borderTop={`1px solid ${theme.grey.light}`}
          paddingX={spacing.large}
          paddingY={spacing.medium}
        >
          <Column>
            <img
              src={device.deviceType === 'desktop' ? desktopImageUrl : mobileImageUrl}
              style={{ display: 'block', maxWidth: '100%', width: '40px' }}
            />
          </Column>
          <Column flex={1} alignItems="flex-start">
            <Text size="small" fontWeight="600">
              {device.name}
            </Text>
            <Text size="small" color={theme.grey.main}>
              {device.deviceId}
            </Text>
          </Column>
        </Row>
      </Column>
    </Button>
  )
}

const m = defineMessages({
  selectRole: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SelectRole.selectRole',
    defaultMessage: 'Select a Role for this Device',
  },
  participantTitle: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SelectRole.participantTitle',
    defaultMessage: 'Participant',
  },
  participantDescription: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SelectRole.participantDescription',
    defaultMessage:
      'As a Participant this device can create, edit, sync and share obervations. They cannot manage users or project details.',
  },
  coordinatorTitle: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SelectRole.coordinatorTitle',
    defaultMessage: 'Coordinator',
  },
  coordinatorDescription: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SelectRole.coordinatorDescription',
    defaultMessage:
      'As a Coordinator this device can invite and remove devices from this project, and manage project details.',
  },
})
