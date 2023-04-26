import { defineMessages, useIntl } from 'react-intl'
import { useTheme } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SendIcon from '@mui/icons-material/Send'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'
import { useMapeoDevice } from '@renderer/hooks/useMapeoDevice'
import { Device, Role } from '@renderer/hooks/stores/mapeoDeviceStore'

import desktopImageUrl from '../../../../../../assets/desktop.png'
import mobileImageUrl from '../../../../../../assets/mobile.png'
import { Text } from '../Text'
import { Button, ButtonText } from '../Button'
import { InviteStatus } from '.'
import styled from '@emotion/styled'
import { GREY_BLUE } from '@renderer/theme'

export const SendInvite = ({
  deviceId,
  inviteStatus,
  onSendInvite,
  selectedRole,
}: {
  deviceId: string
  inviteStatus: Extract<InviteStatus, 'idle' | 'pending' | 'accepted'>
  onSendInvite: () => void
  selectedRole: Role
}) => {
  const { device } = useMapeoDevice(deviceId)

  return (
    <Column flex={1} paddingY="72px" alignItems="center" spacing="48px" overflow="auto">
      {inviteStatus === 'idle' ? (
        <PreSendContent device={device} selectedRole={selectedRole} onSendInvite={onSendInvite} />
      ) : inviteStatus === 'pending' || inviteStatus === 'accepted' ? (
        <PostSendContent device={device} selectedRole={selectedRole} inviteStatus={inviteStatus} />
      ) : null}
    </Column>
  )
}

const DeviceInfo = ({ deviceType, deviceId, name }: Pick<Device, 'deviceType' | 'deviceId' | 'name'>) => {
  const theme = useTheme()
  return (
    <Row spacing={spacing.medium} alignItems="center">
      <img
        src={deviceType === 'desktop' ? desktopImageUrl : mobileImageUrl}
        style={{ display: 'block', maxWidth: '100%', width: '40px' }}
      />
      <Column>
        <Text size="medium" fontWeight="500">
          {name}
        </Text>
        <Text size="small" color={theme.grey.main}>
          {deviceId}
        </Text>
      </Column>
    </Row>
  )
}

const Circle = styled.div(`
  padding: ${spacing.medium};
  border: 1px solid ${GREY_BLUE};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`)

const PreSendContent = ({
  device,
  selectedRole,
  onSendInvite,
}: {
  device: Device
  selectedRole: Role
  onSendInvite: () => void
}) => {
  const { formatMessage: t } = useIntl()
  const theme = useTheme()

  const RoleIcon = selectedRole === 'coordinator' ? ManageAccountsIcon : GroupIcon

  return (
    <>
      <Row>
        <Text size="large" fontWeight="500">
          {t(m.inviting)}
        </Text>
      </Row>
      <Row alignItems="center" justifyContent="center" spacing={spacing.large}>
        <Column>
          <DeviceInfo name={device.name} deviceType={device.deviceType} deviceId={device.deviceId} />
        </Column>
        <Column>
          <Circle>
            <Text size="small" color={theme.grey.main}>
              {t(m.asA)}
            </Text>
          </Circle>
        </Column>
        <Row spacing={spacing.medium} alignItems="center">
          <RoleIcon sx={{ fontSize: '36px' }} htmlColor={theme.black} />
          <Text size="medium" fontWeight="500">
            {t(selectedRole === 'coordinator' ? m.coordinator : m.participant)}
          </Text>
        </Row>
      </Row>
      <Row>
        <Button
          variant="contained"
          disableElevation
          noBorder
          onClick={onSendInvite}
          sx={{ backgroundColor: theme.blue.mid, color: theme.white }}
        >
          <Row alignItems="center" spacing={spacing.medium}>
            <SendIcon color="inherit" />
            <ButtonText>{t(m.sendInvite)}</ButtonText>
          </Row>
        </Button>
      </Row>
    </>
  )
}

const PostSendContent = ({
  device,
  inviteStatus,
  selectedRole,
}: {
  device: Device
  inviteStatus: Extract<InviteStatus, 'pending' | 'accepted'>
  selectedRole: Role
}) => {
  const { formatMessage: t } = useIntl()
  const theme = useTheme()

  const RoleIcon = selectedRole === 'coordinator' ? ManageAccountsIcon : GroupIcon

  return (
    <>
      <Row>
        <Column alignItems="center" spacing={spacing.large}>
          {inviteStatus === 'pending' ? (
            <SendIcon sx={{ fontSize: '72px' }} htmlColor={theme.blue.main} />
          ) : (
            <CheckCircleIcon sx={{ fontSize: '72px' }} htmlColor={theme.successGreen} />
          )}
          <Text size="large" fontWeight="500">
            {t(inviteStatus === 'pending' ? m.pendingMessage : m.acceptedMessage)}
          </Text>
        </Column>
      </Row>
      <Row alignItems="flex-start" justifyContent="center" spacing="72px">
        <Column alignItems="center" spacing={spacing.medium}>
          <Text size="medium" fontWeight="500">
            {t(m.device).toUpperCase()}
          </Text>
          <DeviceInfo name={device.name} deviceType={device.deviceType} deviceId={device.deviceId} />
        </Column>
        <Column alignItems="center" spacing={spacing.medium}>
          <Text size="medium" fontWeight="500">
            {t(m.role).toUpperCase()}
          </Text>
          <Row spacing={spacing.medium} alignItems="center">
            <RoleIcon sx={{ fontSize: '36px' }} htmlColor={theme.black} />
            <Text size="medium" fontWeight="500">
              {t(selectedRole === 'coordinator' ? m.coordinator : m.participant)}
            </Text>
          </Row>
        </Column>
        <Column alignItems="center" spacing={spacing.medium}>
          <Text size="medium" fontWeight="500">
            {t(m.status).toLocaleUpperCase()}
          </Text>
          {inviteStatus === 'pending' ? (
            <Text size="medium" color={theme.grey.main}>
              {t(m.statusPending)}
            </Text>
          ) : (
            <Row spacing={spacing.small} alignItems="center">
              <CheckCircleIcon fontSize="medium" color="success" />
              <Text size="medium" color={theme.successGreen}>
                {t(m.statusAccepted)}
              </Text>
            </Row>
          )}
        </Column>
      </Row>
    </>
  )
}

const m = defineMessages({
  inviting: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.inviting',
    defaultMessage: 'You are inviting...',
  },
  asA: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.asA',
    defaultMessage: 'as a',
  },
  coordinator: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.coordinator',
    defaultMessage: 'Coordinator',
  },
  participant: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.participant',
    defaultMessage: 'Participant',
  },
  sendInvite: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.sendInvite',
    defaultMessage: 'Send Invite',
  },
  pendingMessage: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.pendingMessage',
    defaultMessage: 'Waiting for Device to Accept Invite',
  },
  acceptedMessage: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.acceptedMessage',
    defaultMessage: 'Invite Accepted',
  },
  device: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.device',
    defaultMessage: 'Device',
  },
  role: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.role',
    defaultMessage: 'Role',
  },
  status: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.status',
    defaultMessage: 'Status',
  },
  statusPending: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.statusPending',
    defaultMessage: 'Pending...',
  },
  statusAccepted: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.SendInvite.statusAccepted',
    defaultMessage: 'Accepted!',
  },
})
