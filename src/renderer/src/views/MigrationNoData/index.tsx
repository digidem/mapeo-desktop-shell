import {
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  styled,
  useTheme,
} from '@mui/material'
import { Button } from '@renderer/components/Button'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { defineMessages, useIntl } from 'react-intl'
import { appStrings } from '../../../../common/config/messages'
import { OnboardingLayout } from '@renderer/layouts/Onboarding'
import { useState } from 'react'
import { SkipMigrationModal } from '@renderer/components/SkipMigrationModal'
import { CreateProjectModal } from '@renderer/components/CreateProjectModal'
import { FormLabel } from '@renderer/components/FormLabel'
import { JoinProjectModal } from '@renderer/components/JoinProjectModal'
import { useLocation } from 'react-router-dom'

type LocationState = { hasLeftProject?: boolean }

type ShouldUsePreviousMapeoData = 'yes' | 'no'

export const MigrationNoDataView = () => {
  const intl = useIntl()
  const theme = useTheme()
  const { state } = useLocation()
  const { hasLeftProject } = state as LocationState
  const [shouldUsePreviousMapeoData, setShouldUsePreviousMapeoData] = useState<
    ShouldUsePreviousMapeoData | undefined
  >(hasLeftProject ? 'no' : undefined)
  const [skipModalOpen, setSkipModalOpen] = useState(false)
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false)
  const [joinProjectModalOpen, setJoinProjectModalOpen] = useState(false)

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShouldUsePreviousMapeoData(event.target.value as ShouldUsePreviousMapeoData)
  }

  const appTitle = intl.formatMessage(appStrings.appTitle)

  return (
    <>
      <SkipMigrationModal open={skipModalOpen} onClose={() => setSkipModalOpen(false)}></SkipMigrationModal>
      <CreateProjectModal
        open={createProjectModalOpen}
        onClose={() => setCreateProjectModalOpen(false)}
      ></CreateProjectModal>
      <JoinProjectModal
        open={joinProjectModalOpen}
        onClose={() => setJoinProjectModalOpen(false)}
      ></JoinProjectModal>
      <OnboardingLayout>
        <Column justifyContent="space-between" height={'100%'}>
          <Column spacing={5}>
            <span>
              <Typography variant="h1">{intl.formatMessage(messages.welcomeTitle)}</Typography>
              <Typography variant="h1">{appTitle}</Typography>
            </span>
            <span>
              <Typography variant="body1">{intl.formatMessage(messages.message)}</Typography>
              <Typography variant="body1">{intl.formatMessage(messages.message2)}</Typography>
            </span>

            {!hasLeftProject && (
              <Column component="span">
                <FormLabel sx={{ fontWeight: 700, color: theme.foreground }} required>
                  {intl.formatMessage(messages.question)}
                </FormLabel>
                <Typography variant="caption">{intl.formatMessage(messages.questionCaption)}</Typography>
                <RadioGroup row value={shouldUsePreviousMapeoData} onChange={handleRadioChange}>
                  <FormControlLabel
                    value="yes"
                    sx={{ mr: 4 }}
                    control={<Radio />}
                    label={intl.formatMessage(messages.yes)}
                  />
                  <FormControlLabel value="no" control={<Radio />} label={intl.formatMessage(messages.no)} />
                </RadioGroup>
              </Column>
            )}
            {shouldUsePreviousMapeoData && !hasLeftProject ? <YesInfoCallout /> : null}
            {shouldUsePreviousMapeoData === 'no' ? (
              <NoCards
                onClickJoinProject={() => setJoinProjectModalOpen(true)}
                onClickCreateProject={() => setCreateProjectModalOpen(true)}
              />
            ) : null}
          </Column>

          {shouldUsePreviousMapeoData === 'yes' && (
            <Row justifyContent="space-between" alignItems="flex-start">
              <Button onClick={() => setSkipModalOpen(true)} variant="text" sx={{ color: theme.warningRed }}>
                {intl.formatMessage(messages.skipMigration)}
              </Button>
              <Column alignItems="flex-end" spacing={1}>
                <Button onClick={() => null} variant="contained" disableElevation sx={{ px: 5 }}>
                  {intl.formatMessage(messages.seeMigrationSteps)}
                </Button>
              </Column>
            </Row>
          )}
        </Column>
      </OnboardingLayout>
    </>
  )
}

const YesInfoCallout = () => {
  const theme = useTheme()
  const intl = useIntl()

  return (
    <Card
      sx={{
        backgroundColor: theme.background,
        '.MuiCardContent-root': {
          pb: '16px',
        },
      }}
    >
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="body1">{intl.formatMessage(messages.calloutText)}</Typography>
        <Typography variant="body1">
          <A target="_blank">{intl.formatMessage(messages.calloutLink)}</A>
        </Typography>
      </CardContent>
    </Card>
  )
}

const NoCards = ({
  onClickCreateProject,
  onClickJoinProject,
}: {
  onClickCreateProject: () => void
  onClickJoinProject: () => void
}) => {
  const intl = useIntl()

  return (
    <Row>
      <OptionCard sx={{ mr: 2 }} onClick={onClickCreateProject}>
        <Column>
          <Typography variant="h3" component="label">
            {intl.formatMessage(messages.createProjectTitle)}
          </Typography>
          <Typography variant="body1" component="label">
            {intl.formatMessage(messages.createProjectSubtitle)}
          </Typography>
        </Column>
      </OptionCard>
      <OptionCard onClick={onClickJoinProject}>
        <Column>
          <Typography variant="h3" component="label">
            {intl.formatMessage(messages.joinProjectTitle)}
          </Typography>
          <Typography variant="body1" component="label">
            {intl.formatMessage(messages.joinProjectSubtitle)}
          </Typography>
        </Column>
      </OptionCard>
    </Row>
  )
}

const OptionCard = styled(Card)`
  flex: 1;
  padding: 4em 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.grey.light};
  cursor: pointer;

  * {
    cursor: pointer;
  }
`

const A = styled('a')`
  color: ${({ theme }) => theme.blue.main};
  text-decoration: none;

  ::after {
    content: '🡕';
    vertical-align: super;
    font-size: smaller;
  }
`

const messages = defineMessages({
  welcomeTitle: {
    id: 'views.migrationNoData.welcomeTitle',
    defaultMessage: 'Welcome to',
  },
  message: {
    id: 'views.migrationNoData.message',
    defaultMessage: 'We are excited for you to experience the updated Mapeo.',
  },
  message2: {
    id: 'views.migrationNoData.message2',
    defaultMessage: 'One quick question before you get started:',
  },
  question: {
    id: 'views.migrationNoData.question',
    defaultMessage: 'Have you used a previous version of Mapeo?',
  },
  questionCaption: {
    id: 'views.migrationNoData.questionCaption',
    defaultMessage: 'This could be an earlier version of Mapeo on deskop or mobile. Versions 5x and earlier.',
  },
  yes: {
    id: 'views.migrationNoData.yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'views.migrationNoData.no',
    defaultMessage: 'No',
  },
  calloutText: {
    id: 'views.migrationNoData.calloutText',
    defaultMessage:
      'Your previous Mapeo data will not be visible in the new Mapeo applications until you migrate your data. To start, sync the data on your mobile device with the previous version of Mapeo. ',
  },
  calloutLink: {
    id: 'views.migrationNoData.calloutLink',
    defaultMessage: 'Mapeo Support Materials',
  },
  skipMigration: {
    id: 'views.migrationNoData.skipMigration',
    defaultMessage: 'Skip Migration',
  },
  seeMigrationSteps: {
    id: 'views.migrationNoData.seeMigrationSteps',
    defaultMessage: 'See Migration Steps',
  },
  noPathMessage: {
    id: 'views.migrationNoData.noPathMessage',
    defaultMessage: "Great, let's get started!",
  },
  createProjectTitle: {
    id: 'views.migrationNoData.createProjectTitle',
    defaultMessage: 'Create a Project',
  },
  createProjectSubtitle: {
    id: 'views.migrationNoData.createProjectSubtitle',
    defaultMessage: 'Start a new Mapeo Project',
  },
  joinProjectTitle: {
    id: 'views.migrationNoData.joinProjectTitle',
    defaultMessage: 'Join a Project',
  },
  joinProjectSubtitle: {
    id: 'views.migrationNoData.joinProjectSubtitle',
    defaultMessage: 'Join an existing Mapeo Project',
  },
})
