import * as React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'

import { Button } from './Button'
import { ConfigSection } from './ConfigSection'
import { ManageTeamSection } from './ManageTeamSection'
import { Text } from './Text'

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

interface Member {
  isSelf?: true
  id: string
  deviceType: 'mobile' | 'desktop'
  lastSynced: number
  name: string
  deviceId: string
}

export interface Coordinator extends Member {
  role: 'coordinator'
}

export interface Participant extends Member {
  role: 'participant'
}

const HeaderSection = () => {
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
      <Button variant="outlined" onClick={() => {}}>
        {t(m.joinProject)}
      </Button>
    </Row>
  )
}

export const ProjectConfig = () => {
  const [coordinators] = React.useState<Coordinator[]>([
    {
      id: 'me',
      isSelf: true,
      deviceType: 'desktop',
      lastSynced: Date.now(),
      name: 'My Computer',
      deviceId: 'abc123',
      role: 'coordinator',
    },
  ])

  const [participants] = React.useState<Participant[]>([
    {
      id: 'peer 1',
      deviceType: 'mobile',
      lastSynced: Date.now(),
      name: 'Peer 1 Android',
      deviceId: '123abc',
      role: 'participant',
    },
  ])

  return (
    <Box display="flex" justifyContent="flex-start" flexDirection="column" flex={1}>
      <HeaderSection />
      <ConfigSection />
      <ManageTeamSection coordinators={coordinators} participants={participants} />
    </Box>
  )
}
