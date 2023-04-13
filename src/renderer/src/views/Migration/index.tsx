import { Card, CardContent, CardHeader, Checkbox, Typography, useTheme } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category'
import { Button } from '@renderer/components/Button'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { DefaultLayout } from '@renderer/layouts/default'
// import { theme } from '@renderer/theme'
import { defineMessages, useIntl } from 'react-intl'
import { appStrings } from '../../../../common/config/messages'
import { Logo } from '../SplashScreen/logo'
import { BoldSpan, Contents } from './styles'
import { useRef, useState } from 'react'
import { SkipMigrationModal } from '@renderer/components/SkipMigrationModal'

const PROJECT_KEY = '2023R**********'
const CONFIG_ADDRESS = 'mapeoconf.v3'

export const MigrationView = () => {
  const intl = useIntl()
  const theme = useTheme()
  const observations = useRef(Math.floor(Math.random() * 100))
  const images = useRef(Math.floor(Math.random() * 100))
  const [skipModalOpen, setSkipModalOpen] = useState(false)

  const appTitle = intl.formatMessage(appStrings.appTitle)

  return (
    <DefaultLayout langBackgroundVarient="dark">
      <SkipMigrationModal open={skipModalOpen} onClose={() => setSkipModalOpen(false)}></SkipMigrationModal>
      <Row sx={{ height: '100vh' }}>
        <Column
          sx={{ bgcolor: theme.background, flex: 1, padding: '6em 8em 3em 8em' }}
          justifyContent={'space-between'}
        >
          <Column spacing={3}>
            <span>
              <Typography variant="h1">{intl.formatMessage(messages.welcomeTitle)}</Typography>
              <Typography variant="h1">{appTitle}</Typography>
            </span>
            <Typography variant="h2">{intl.formatMessage(messages.migratePreviousTitle)}</Typography>
          </Column>
          <Column spacing={6}>
            <Column spacing={3}>
              <Typography variant="body1">
                {intl.formatMessage(messages.migratePreviousInstruction)}
              </Typography>
              <Column component="ul" spacing={2}>
                <CheckItem message={intl.formatMessage(messages.migrateInstruction1)} />
                <CheckItem message={intl.formatMessage(messages.migrateInstruction2, { appTitle })} />
              </Column>
            </Column>
          </Column>
          <DetailsCard
            projectKey={PROJECT_KEY}
            configAddress={CONFIG_ADDRESS}
            observations={observations.current}
            images={images.current}
          />
          <Row justifyContent="space-between" alignItems="flex-start">
            {/* Buttons currently do nothing */}
            <Button onClick={() => setSkipModalOpen(true)} variant="text" sx={{ color: theme.warningRed }}>
              {intl.formatMessage(messages.skipMigration)}
            </Button>
            <Column alignItems="flex-end" spacing={1}>
              <Button onClick={() => null} variant="contained" disableElevation>
                {intl.formatMessage(messages.migrate)}
              </Button>
              <Typography variant="caption" component="label">
                {intl.formatMessage(messages.migrateInfo)}
              </Typography>
            </Column>
          </Row>
        </Column>

        <Contents
          sx={{
            height: '100%',
            flex: 1,
            backgroundColor: theme.primary,
            flexDirection: 'column',
            padding: '6em 8em',
          }}
        >
          <Logo />
        </Contents>
      </Row>
    </DefaultLayout>
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
type DetailProps = DetailsHeaderProps & {
  observations: number
  images: number
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

const DetailsCard = ({ projectKey, configAddress, observations, images }: DetailProps) => {
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
              {observations} {intl.formatMessage(messages.observations)}
            </Typography>
          </Row>
          <Row spacing={3} alignItems="center">
            <PhotoCameraIcon fontSize="large" />
            <Typography variant="body1" fontSize="large" sx={{ color: theme.grey.main }}>
              {images} {intl.formatMessage(messages.images)}
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
