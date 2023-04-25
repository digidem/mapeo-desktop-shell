import * as React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import styled from '@emotion/styled'
import { useTheme } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAddAltOutlined'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { OFF_BLACK } from '@renderer/theme'
import { spacing } from '@renderer/theme/spacing'
import { MemberDevice } from '@renderer/hooks/stores/mapeoDeviceStore'
import { useMapeoDeviceMembers } from '@renderer/hooks/useMapeoMembersList'

import desktopImageUrl from '../../../../../assets/desktop.png'
import mobileImageUrl from '../../../../../assets/mobile.png'
import { PressableText } from './PressableText'
import { Text } from './Text'
import { Button, ButtonText } from './Button'
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
})

const BlackSquarePlaceholder = styled.div(
  ({ rotated }: { rotated?: boolean }) => `
  width: 30px;
  height: 30px;
  background-color: ${OFF_BLACK};
  margin-inline-end: ${spacing.medium};
  ${rotated ? 'transform: rotate(45deg);' : undefined}
`,
)

const MemberCard = ({
  member,
  openLeaveProjectModal,
}: {
  member: MemberDevice
  openLeaveProjectModal: () => void
}) => {
  const { formatMessage: t } = useIntl()
  const theme = useTheme()
  return (
    <Row
      padding={spacing.large}
      alignItems="center"
      sx={{
        maxWidth: '400px',
        minWidth: '300px',
        backgroundColor: theme.white,
        borderRadius: '6px',
        border: `1px solid ${theme.grey.light}`,
      }}
    >
      <Column marginRight={spacing.medium}>
        <img
          src={member.deviceType === 'desktop' ? desktopImageUrl : mobileImageUrl}
          style={{ display: 'block', maxWidth: '100%', width: '40px' }}
        />
      </Column>
      <Column flex={1}>
        <Row justifyContent="space-between">
          <Text size="small" fontWeight="600">
            {member.name}
          </Text>
          <Text size="small" color={theme.grey.main}>
            {new Date(member.dateAdded).toLocaleDateString()}
          </Text>
        </Row>
        <Row justifyContent="space-between">
          <Text size="small" color={theme.grey.main}>
            {member.isSelf ? 'This Device!' : member.deviceId}
          </Text>
          {member.isSelf && (
            <PressableText destructive onClick={openLeaveProjectModal}>
              {t(m.leaveProject)}
            </PressableText>
          )}
        </Row>
      </Column>
    </Row>
  )
}

export const ManageTeamSection = () => {
  const { formatMessage: t } = useIntl()
  const theme = useTheme()
  const [leaveProjectModalOpen, setLeaveProjectModalOpen] = React.useState(false)

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
            <Button variant="outlined" onClick={() => {}}>
              <Row spacing={spacing.small} alignItems="center">
                <PersonAddIcon sx={{ fontSize: '18px' }} />
                <ButtonText>{t(m.invite)}</ButtonText>
              </Row>
            </Button>
          </Row>
        </Column>
        <Column paddingY={spacing.large} spacing={spacing.large}>
          <Column spacing={spacing.large}>
            <Row alignItems="center">
              <BlackSquarePlaceholder />
              <Text size="medium" fontWeight="600">
                {t(m.coordinators)}
              </Text>
            </Row>
            <Column spacing={spacing.medium}>
              {coordinators.map((c) => (
                <MemberCard
                  key={c.deviceId}
                  member={c}
                  openLeaveProjectModal={() => setLeaveProjectModalOpen(true)}
                />
              ))}
            </Column>
          </Column>
          <Column spacing={spacing.large}>
            <Row alignItems="center">
              <BlackSquarePlaceholder rotated />
              <Text size="medium" fontWeight="600">
                {t(m.participants)}
              </Text>
            </Row>
            <Column spacing={spacing.medium}>
              {participants.map((p) => (
                <MemberCard
                  key={p.deviceId}
                  openLeaveProjectModal={() => setLeaveProjectModalOpen(true)}
                  member={p}
                />
              ))}
            </Column>
          </Column>
        </Column>
      </Column>
      <LeaveProjectModal
        closeModal={() => setLeaveProjectModalOpen(false)}
        isOpen={leaveProjectModalOpen}
        projectName="catapult"
      />
    </React.Fragment>
  )
}
