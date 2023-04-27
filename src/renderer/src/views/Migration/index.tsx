import { Card, CardContent, CardHeader, Checkbox, Typography, useTheme } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category'
import { Button } from '@renderer/components/Button'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { defineMessages, useIntl } from 'react-intl'
import { appStrings } from '../../../../common/config/messages'
import { BoldSpan } from './styles'
import { useState } from 'react'
import { SkipMigrationModal } from '@renderer/components/SkipMigrationModal'
import { Link } from 'react-router-dom'
import { OnboardingLayout } from '@renderer/layouts/Onboarding'
import { MEDIA, OBSERVATIONS } from '@renderer/lib/Observations'

const PROJECT_KEY = '2023R**********'
const CONFIG_ADDRESS = 'mapeoconf.v3'

export const MigrationView = () => {
  const intl = useIntl()
  const theme = useTheme()
  const [skipModalOpen, setSkipModalOpen] = useState(false)

  const appTitle = intl.formatMessage(appStrings.appTitle)

  return (
    <OnboardingLayout>
      <SkipMigrationModal open={skipModalOpen} onClose={() => setSkipModalOpen(false)}></SkipMigrationModal>
      <Column sx={{ bgcolor: theme.white, flex: 1 }} justifyContent={'space-between'}>
        <Column spacing={3}>
          <span>
            <Typography variant="h1">{intl.formatMessage(messages.welcomeTitle)}</Typography>
            <Typography variant="h1">{appTitle}</Typography>
          </span>
          <Typography variant="h2">{intl.formatMessage(messages.migratePreviousTitle)}</Typography>
        </Column>
        <Column spacing={6}>
          <Column spacing={3}>
            <Typography variant="body1">{intl.formatMessage(messages.migratePreviousInstruction)}</Typography>
            <Column component="ul" spacing={2}>
              <CheckItem message={intl.formatMessage(messages.migrateInstruction1)} />
              <CheckItem message={intl.formatMessage(messages.migrateInstruction2, { appTitle })} />
            </Column>
          </Column>
        </Column>
        <DetailsCard projectKey={PROJECT_KEY} configAddress={CONFIG_ADDRESS} />
        <Row justifyContent="space-between" alignItems="flex-start">
          <Button onClick={() => setSkipModalOpen(true)} variant="text" sx={{ color: theme.warningRed }}>
            {intl.formatMessage(messages.skipMigration)}
          </Button>
          <Column alignItems="flex-end" spacing={1}>
            <Link to="/migrating-project" style={{ textDecoration: 'none' }}>
              <Button onClick={() => null} variant="contained" disableElevation>
                {intl.formatMessage(messages.migrate)}
              </Button>
            </Link>
            <Typography variant="caption" component="label">
              {intl.formatMessage(messages.migrateInfo)}
            </Typography>
          </Column>
        </Row>
      </Column>
    </OnboardingLayout>
  )
}

const CheckItem = ({ message }: { message: string }) => {
  return (
    <Row component="li" alignItems="flex-start">
      <Checkbox checked={false} disableRipple sx={{ padding: 0, paddingRight: 1, cursor: 'default' }} />
      <Typography variant="body1">{message}</Typography>
    </Row>
  )
}

type DetailsHeaderProps = {
  projectKey: string
  configAddress: string
}

const DetailsCardHeader = ({ projectKey, configAddress }: DetailsHeaderProps) => {
  const intl = useIntl()

  return (
    <Row spacing={4}>
      <span>
        <Typography variant="body1">
          {intl.formatMessage(messages.projectKeyTitle)}: <BoldSpan>{projectKey}</BoldSpan>
        </Typography>
      </span>
      <span>
        <Typography variant="body1">
          {intl.formatMessage(messages.configTitle)}: <BoldSpan>{configAddress}</BoldSpan>
        </Typography>
      </span>
    </Row>
  )
}

const DetailsCard = ({ projectKey, configAddress }: DetailsHeaderProps) => {
  const theme = useTheme()
  const intl = useIntl()

  return (
    <Card sx={{ width: '85%' }}>
      <CardHeader
        sx={{ backgroundColor: theme.grey.light }}
        title={<DetailsCardHeader projectKey={projectKey} configAddress={configAddress} />}
      ></CardHeader>
      <CardContent>
        <Column spacing={3}>
          <Row spacing={3} alignItems="center">
            <CategoryIcon fontSize="large" />
            <Typography variant="body1" fontSize="large" sx={{ color: theme.grey.main }}>
              {OBSERVATIONS} {intl.formatMessage(messages.observations)}
            </Typography>
          </Row>
          <Row spacing={3} alignItems="center">
            <PhotoCameraIcon fontSize="large" />
            <Typography variant="body1" fontSize="large" sx={{ color: theme.grey.main }}>
              {MEDIA} {intl.formatMessage(messages.images)}
            </Typography>
          </Row>
        </Column>
      </CardContent>
    </Card>
  )
}

const messages = defineMessages({
  welcomeTitle: {
    id: 'views.migration.welcomeTitle',
    defaultMessage: 'Welcome to',
  },
  migratePreviousTitle: {
    id: 'views.migration.migratePreviousTitle',
    defaultMessage: 'Migrate your previous Mapeo data',
  },
  migratePreviousInstruction: {
    id: 'views.migration.migratePreviousInstruction',
    defaultMessage:
      'We have found a previous Mapeo project. Follow the steps below to begin migrating to the new Mapeo:',
  },
  migrateInstruction1: {
    id: 'views.migration.migrateInstruction1',
    defaultMessage: 'Migrating from [x] to [y]',
  },
  migrateInstruction2: {
    id: 'views.migration.migrateInstruction2',
    defaultMessage: 'You will have to coordinated with your team to upgrade each mobile device to {appTitle}',
  },
  projectKeyTitle: {
    id: 'views.migration.projectKeyTitle',
    defaultMessage: 'Project key',
  },
  configTitle: {
    id: 'views.migration.configTitle',
    defaultMessage: 'Config',
  },
  observations: {
    id: 'views.migration.observations',
    defaultMessage: 'Observations',
  },
  images: {
    id: 'views.migration.images',
    defaultMessage: 'Images',
  },
  skipMigration: {
    id: 'views.migration.skipMigration',
    defaultMessage: 'Skip migration',
  },
  migrate: {
    id: 'views.migration.migrate',
    defaultMessage: 'Migrate',
  },
  migrateInfo: {
    id: 'views.migration.migrateInfo',
    defaultMessage: 'It should take less than 5 minutes!',
  },
})
