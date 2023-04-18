import {
  Card,
  CardContent,
  FormControlLabel,
  FormLabel,
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

export const MigrationNoDataView = () => {
  const intl = useIntl()
  const theme = useTheme()
  const [previouslyMapeoUser, setIsPrevMapeoUser] = useState<boolean | undefined>()

  const getRadioValue = () => {
    if (previouslyMapeoUser === true) return 'yes'
    if (previouslyMapeoUser === false) return 'no'
    return null
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrevMapeoUser((event.target as HTMLInputElement).value === 'yes' ? true : false)
  }

  const appTitle = intl.formatMessage(appStrings.appTitle)

  return (
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

          <Column component="span">
            <StyledFormLabel sx={{ fontWeight: 700, color: theme.foreground }} required>
              {intl.formatMessage(messages.question)}
            </StyledFormLabel>
            <Typography variant="caption">{intl.formatMessage(messages.questionCaption)}</Typography>
            <RadioGroup row value={getRadioValue()} onChange={handleRadioChange}>
              <FormControlLabel
                value="yes"
                sx={{ mr: 7 }}
                control={<Radio />}
                label={intl.formatMessage(messages.yes)}
              />
              <FormControlLabel value="no" control={<Radio />} label={intl.formatMessage(messages.no)} />
            </RadioGroup>
          </Column>
          {previouslyMapeoUser ? <YesInfoCallout /> : null}
        </Column>
        <Row justifyContent="space-between" alignItems="flex-start">
          <Button onClick={() => null} variant="text" sx={{ color: theme.warningRed }}>
            {intl.formatMessage(messages.skipMigration)}
          </Button>
          <Column alignItems="flex-end" spacing={1}>
            <Button onClick={() => null} variant="contained" disableElevation sx={{ px: 5 }}>
              {intl.formatMessage(messages.seeMigrationSteps)}
            </Button>
          </Column>
        </Row>
      </Column>
    </OnboardingLayout>
  )
}

const YesInfoCallout = () => {
  const theme = useTheme()
  const intl = useIntl()

  return (
    <Card sx={{ backgroundColor: theme.background }}>
      <CardContent>
        <Typography variant="body1">{intl.formatMessage(messages.calloutText)}</Typography>
      </CardContent>
    </Card>
  )
}

const StyledFormLabel = styled(FormLabel)`
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};

  .MuiFormLabel-asterisk {
    color: ${({ theme }) => theme.warningRed};
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
})
