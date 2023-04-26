import * as React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useTheme } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAddAltOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import GroupIcon from '@mui/icons-material/Group'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'
import { MemberDevice } from '@renderer/hooks/stores/mapeoDeviceStore'
import { useMapeoDeviceMembers } from '@renderer/hooks/useMapeoMembersList'

import { PressableText } from './PressableText'
import { Text } from './Text'
import { Button, ButtonText } from './Button'
import { PeerCard } from './PeerCard'
import { LeaveProjectModal } from '@renderer/components/LeaveProjectModal'

const m = defineMessages({
  title: {
    id: 'views.Home.Settings.ProjectConfig.ManageTeamSection.title',
    defaultMessage: 'Manage Team',
  },
  description: {
    id: 'views.Home.Settings.ProjectConfig.ManageTeamSection.description',
    defaultMessage: 'Invite other devices to your project to start syncing and sharing data',
  },
  invite: {
    id: 'views.Home.Settings.ProjectConfig.ManageTeamSection.invite',
    defaultMessage: 'Invite',
  },
  coordinators: {
    id: 'views.Home.Settings.ProjectConfig.ManageTeamSection.coordinator',
    defaultMessage: 'Coordinators',
  },
  participants: {
    id: 'views.Home.Settings.ProjectConfig.ManageTeamSection.participants',
    defaultMessage: 'Participants',
  },
  leaveProject: {
    id: 'views.Home.Settings.ProjectConfig.ManageTeamSection.leaveProject',
    defaultMessage: 'Leave Project',
  },
  thisDevice: {
    id: 'views.Home.Settings.ProjectConfig.ManageTeamSection.thisDevice',
    defaultMessage: 'This Device!',
  },
})

const MemberCard = ({ member, openLeaveModal }: { member: MemberDevice; openLeaveModal: () => void }) => {
  const { formatMessage: t } = useIntl()

  return (
    <PeerCard
      deviceType={member.deviceType}
      title={member.name}
      subtitle={member.isSelf ? t(m.thisDevice) : member.deviceId}
      dateText={new Date(member.dateAdded).toLocaleDateString()}
      pressableAction={
        member.isSelf ? (
          <PressableText destructive onClick={openLeaveModal}>
            {t(m.leaveProject)}
          </PressableText>
        ) : undefined
      }
    />
  )
}

export const ManageTeamSection = ({ onInviteClick }: { onInviteClick: () => void }) => {
  const { formatMessage: t } = useIntl()
  const theme = useTheme()
  const [leaveModalOpen, setLeaveModalOpen] = React.useState(false)

  const members = useMapeoDeviceMembers()

  const { coordinators, participants } = React.useMemo(() => {
    const c: MemberDevice[] = []
    const p: MemberDevice[] = []

    for (const device of Object.values(members)) {
      if (device.role === 'coordinator') {
        c.push(device)
      } else {
        p.push(device)
      }
    }

    return { coordinators: c, participants: p }
  }, [members])

  return (
    <React.Fragment>
      <Column padding={spacing.large} sx={{ backgroundColor: theme.background }} flex={1}>
        <Column spacing={spacing.medium}>
          <Column spacing={spacing.small}>
            <Row>
              <Text variant="h2" size="medium" fontWeight="600">
                {t(m.title)}
              </Text>
            </Row>
            <Row>
              <Text size="medium" variant="body1">
                {t(m.description)}
              </Text>
            </Row>
          </Column>
          <Row>
            <Button variant="outlined" onClick={onInviteClick}>
              <Row spacing={spacing.small} alignItems="center">
                <PersonAddIcon sx={{ fontSize: '18px' }} />
                <ButtonText>{t(m.invite)}</ButtonText>
              </Row>
            </Button>
          </Row>
        </Column>
        <Column paddingY={spacing.large} spacing={spacing.large}>
          <Column spacing={spacing.large}>
            <Row alignItems="center" spacing={spacing.small}>
              <ManageAccountsIcon fontSize="large" htmlColor={theme.black} />
              <Text size="medium" fontWeight="600">
                {t(m.coordinators)}
              </Text>
            </Row>
            <Column spacing={spacing.medium}>
              {coordinators.map((c) => (
                <MemberCard openLeaveModal={() => setLeaveModalOpen(true)} key={c.deviceId} member={c} />
              ))}
            </Column>
          </Column>
          <Column spacing={spacing.large}>
            <Row alignItems="center" spacing={spacing.small}>
              <GroupIcon fontSize="large" htmlColor={theme.black} />
              <Text size="medium" fontWeight="600">
                {t(m.participants)}
              </Text>
            </Row>
            <Column spacing={spacing.medium}>
              {participants.map((p) => (
                <MemberCard openLeaveModal={() => setLeaveModalOpen(true)} key={p.deviceId} member={p} />
              ))}
            </Column>
          </Column>
        </Column>
      </Column>
      <LeaveProjectModal isOpen={leaveModalOpen} closeModal={() => setLeaveModalOpen(false)} />
    </React.Fragment>
  )
}
