import { Button, Container, FormHelperText, InputLabel, TextField, Typography, useTheme } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { Logo } from '@renderer/components/Logo'
import { DefaultLayout } from '@renderer/layouts/default'
import { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

const NAME_MAX_CHARS = 30
const CONFIG_NAME = 'my-special-config-20.mapeoconfig'

export const MigrationCompleteView = () => {
  const theme = useTheme()
  const intl = useIntl()
  const [name, setName] = useState('')
  const [formError, setFormError] = useState(false)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formError) setFormError(false)

    setName(event.target.value)
  }

  const handleClickFinish = () => {
    if (!name) setFormError(true)
  }

  return (
    <DefaultLayout
      sx={{
        backgroundColor: theme.white,
        pt: '15vh',
        display: 'grid',
        gridTemplateRows: 'auto minmax(auto, 75px)',
        gridTemplateColumns: '1fr',
      }}
    >
      <Container maxWidth="lg">
        <Column spacing={10} alignItems="center">
          <Container maxWidth="sm">
            <Row alignItems="center" justifyContent="center">
              <Logo textColourVariant="dark" />
            </Row>
          </Container>

          <Container maxWidth="sm">
            <Column justifyContent="space-between" alignItems="flex-start" spacing={1}>
              <InputLabel sx={{ fontWeight: 700, color: theme.foreground, fontSize: 20 }} required>
                {intl.formatMessage(messages.enterProjectName)}
              </InputLabel>
              <TextField
                error={formError}
                inputProps={{
                  maxLength: NAME_MAX_CHARS,
                }}
                InputProps={{
                  endAdornment: formError ? <ErrorIcon color="error" /> : null,
                }}
                id="outlined-basic"
                label=""
                sx={{ width: '100%' }}
                variant="outlined"
                size="small"
                onChange={handleNameChange}
                value={name}
              />

              <Row justifyContent="space-between" sx={{ width: '100%' }}>
                {formError ? (
                  <FormHelperText sx={{ color: theme.warningRed, fontWeight: 700, mt: 0 }}>
                    {intl.formatMessage(messages.noNameErrorMessage)}
                  </FormHelperText>
                ) : (
                  <span />
                )}
                <Typography variant="caption" align="right">
                  {name.length} / {NAME_MAX_CHARS}
                </Typography>
              </Row>
            </Column>
          </Container>

          <Container maxWidth="sm">
            <Column justifyContent="space-between" alignItems="flex-start" spacing={4}>
              <span>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.foreground, fontSize: 20 }}>
                  {intl.formatMessage(messages.importedConfig)}
                </Typography>
                <Typography variant="caption">
                  {intl.formatMessage(messages.importedConfigCaption)}
                </Typography>
              </span>
              <Typography variant="body1">{CONFIG_NAME}</Typography>
            </Column>
          </Container>
        </Column>
      </Container>
      <Row
        justifyContent="flex-end"
        sx={{
          paddingY: 2,
          paddingX: 4,
          borderTop: '1px solid',
          borderColor: theme.grey.light,
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          disableRipple
          sx={{ textTransform: 'none', fontWeight: 700, paddingX: 5 }}
          onClick={handleClickFinish}
        >
          {intl.formatMessage(messages.finish)}
        </Button>
      </Row>
    </DefaultLayout>
  )
}

const messages = defineMessages({
  enterProjectName: {
    id: 'views.migrationComplete.enterProjectName',
    defaultMessage: 'Enter a name for your Project',
  },
  projectNamePlaceholder: {
    id: 'views.migrationComplete.projectNamePlaceholder',
    defaultMessage: 'Project Name',
  },
  importedConfig: {
    id: 'views.migrationComplete.importedConfig',
    defaultMessage: 'Imported Config',
  },
  importedConfigCaption: {
    id: 'views.migrationComplete.importedConfigCaption',
    defaultMessage: 'You will be able to update the config after you migrate.',
  },
  noNameErrorMessage: {
    id: 'views.migrationComplete.noNameErrorMessage',
    defaultMessage: 'Please enter a name for your project',
  },
  finish: {
    id: 'views.migrationComplete.finish',
    defaultMessage: 'Finish',
  },
})
