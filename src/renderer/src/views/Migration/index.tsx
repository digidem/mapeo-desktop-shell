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
      <Column sx={{ bgcolor: theme.white }} justifyContent={'space-between'}>
        <Column spacing={3}>
          <span>
            <Typography variant="h1">{intl.formatMessage(messages.welcomeTitle)}</Typography>
            <Typography variant="h1">{appTitle}</Typography>
          </span>
          <Typography variant="h2">{intl.formatMessage(messages.migratePreviousTitle)}</Typography>
        </Column>
        <Column spacing={6}>
          <Column spacing={3} marginBottom={1}>
            <Typography variant="body1">{intl.formatMessage(messages.migratePreviousInstruction)}</Typography>
            <Row maxHeight={500}>
              <Column spacing={1}>
                <CheckItem message={intl.formatMessage(messages.migrateInstruction1)} />
                <CheckItem message={intl.formatMessage(messages.migrateInstruction2)} />
                <CheckItem message={intl.formatMessage(messages.migrateInstruction3)} />
                <CheckItem message={intl.formatMessage(messages.migrateInstruction4)} />
              </Column>
              <Column spacing={1}>
                <CheckItem message={intl.formatMessage(messages.migrateInstruction5)} />
                <CheckItem message={intl.formatMessage(messages.migrateInstruction6)} />
                <CheckItem message={intl.formatMessage(messages.migrateInstruction7)} />
              </Column>
            </Row>
          </Column>
        </Column>
        <DetailsCard projectKey={PROJECT_KEY} configAddress={CONFIG_ADDRESS} />
        <Row justifyContent="space-between" alignItems="flex-start">
          <Button color="warning" onClick={() => setSkipModalOpen(true)} variant="text">
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
      'We have found a previous Mapeo project. To begin using MapeoSuperS with the data you have on Mapeo 5, data migration is required. Once you are ready to migrate your data to MapeoSuperS, follow the steps below.',
  },
  migrateInstruction1: {
    id: 'views.migration.migrateInstruction1',
    defaultMessage:
      'Migrating from Mapeo5 to MapeoSuperS will add additional security features including encryption',
  },
  migrateInstruction2: {
    id: 'views.migration.migrateInstruction2',
    defaultMessage:
      'If you already have peers to synchronize Mapeo with, it is important that you are all ready to update together. You will not be able to synchronize your new Mapeo data with a device that has old Mapeo',
  },
  migrateInstruction3: {
    id: 'views.migration.migrateInstruction3',
    defaultMessage:
      'MapeoSuperS introduces a new way to manage data security with your peers through Projects',
  },
  migrateInstruction4: {
    id: 'views.migration.migrateInstruction4',
    defaultMessage:
      'Only one device in your Mapeo peer group can migrate the data to new Mapeo. It is recommended that before migration begins, all peers synchronize with old Mapeo. This selected device can migrate more data later if needed',
  },
  migrateInstruction5: {
    id: 'views.migration.migrateInstruction5',
    defaultMessage:
      'Once you have synchronized with all or most devices in your old Mapeo project you are ready to Migrate data. It is easy. Let new Mapeo do the work for you by clicking Migrate',
  },
  migrateInstruction6: {
    id: 'views.migration.migrateInstruction6',
    defaultMessage:
      'If another device has been designated as the migration device you need to skip migration. You will start with an empty database. You will need to be invited by the migration device to the new enhanced project in new Mapeo and sync to get prior Mapeo data back on your device',
  },
  migrateInstruction7: {
    id: 'views.migration.migrateInstruction7',
    defaultMessage:
      'Have you decided you want a fresh start? You can skip migration. You can always migrate your data later',
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
