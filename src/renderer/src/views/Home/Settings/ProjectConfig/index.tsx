import * as React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { Row } from '@renderer/components/LayoutComponents'
import { JoinProjectModal } from '@renderer/components/JoinProjectModal'
import { spacing } from '@renderer/theme/spacing'

import { Button } from './Button'
import { ConfigSection } from './ConfigSection'
import { ManageTeamSection } from './ManageTeamSection'
import { Text } from './Text'
import { InviteDeviceModal } from './InviteDeviceModal'

const m = defineMessages({
  title: {
    id: 'views.Home.Settings.ProjectConfig.index.title',
    defaultMessage: 'Project Configuration',
  },
  joinProject: {
    id: 'views.Home.Settings.ProjectConfig.index.joinProject',
    defaultMessage: 'Join Project',
  },
})

const HeaderSection = ({ onJoinProject }: { onJoinProject: () => void }) => {
  const { formatMessage: t } = useIntl()

  return (
    <Row
      paddingX={spacing.large}
      paddingY={spacing.medium}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontWeight="600" size="large" variant="h1">
        {t(m.title)}
      </Text>
      <Button variant="outlined" onClick={onJoinProject}>
        {t(m.joinProject)}
      </Button>
    </Row>
  )
}

export const ProjectConfig = () => {
  const [joinProjectModalOpen, setJoinProjectModalOpen] = React.useState(false)
  const [inviteModalOpen, setInviteModalOpen] = React.useState(false)

  return (
    <Box display="flex" justifyContent="flex-start" flexDirection="column" flex={1}>
      <JoinProjectModal open={joinProjectModalOpen} onClose={() => setJoinProjectModalOpen(false)} />
      <InviteDeviceModal open={inviteModalOpen} onClose={() => setInviteModalOpen(false)} />
      <HeaderSection onJoinProject={() => setJoinProjectModalOpen(true)} />
      <ConfigSection />
      <ManageTeamSection onInviteClick={() => setInviteModalOpen(true)} />
    </Box>
  )
}
