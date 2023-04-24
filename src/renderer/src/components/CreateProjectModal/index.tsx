import { useState } from 'react'
import {
  Container,
  Dialog,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import { Column, Row } from '../LayoutComponents'
import { defineMessages, useIntl } from 'react-intl'
import { Button } from '../Button'
import { FormLabel } from '../FormLabel'
import { useNavigate } from 'react-router-dom'

const PROJECT_NAME_MAX_LENGTH = 100
const DEVICE_NAME_MAX_LENGTH = 60

export const CreateProjectModal = ({ open, onClose }: CreateProjectModalProps) => {
  const intl = useIntl()
  const theme = useTheme()
  const navigate = useNavigate()
  const [projectName, setProjectName] = useState('')
  const [deviceName, setDeviceName] = useState('')
  const [projectNameError, setProjectNameError] = useState('')
  const [deviceNameError, setDeviceNameError] = useState('')
  const [teamMembersShouldBeVisible, setTeamMembersShouldBeVisible] = useState<boolean | undefined>()
  const [teamMembersObservationsEditable, setTeamMembersObservationsEditable] = useState<
    boolean | undefined
  >()

  const handleTeamMembersVisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamMembersShouldBeVisible((event.target as HTMLInputElement).value === 'yes' ? true : false)
  }
  const handleObservationsEditableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamMembersObservationsEditable((event.target as HTMLInputElement).value === 'yes' ? true : false)
  }

  const handleCloseDialog = (event?: Record<string, never>, reason?: 'escapeKeyDown' | 'backdropClick') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
    onClose()
  }

  const handleClickCreateProject = () => {
    if (!projectName) {
      setProjectNameError(intl.formatMessage(messages.projectNameRequired))
    }

    if (!deviceName) {
      setDeviceNameError(intl.formatMessage(messages.deviceNameRequired))
    }

    if (projectName && deviceName) {
      navigate('/') // Should navigate to app in observation mode, but not available in this branch yet.
    }
  }

  const handleProjectNameChange = (e) => {
    if (projectNameError) setProjectNameError('')

    setProjectName(e.target.value)
  }

  const handleDeviceNameChange = (e) => {
    if (deviceNameError) setDeviceNameError('')

    setDeviceName(e.target.value)
  }

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="xl" fullWidth scroll="body">
      <Column justifyContent="space-between">
        <Container
          maxWidth="xl"
          sx={{ paddingY: 4, borderBottom: '1px solid', borderColor: theme.grey.light }}
        >
          <Typography variant="h3" component="h1">
            {intl.formatMessage(messages.title)}
          </Typography>
        </Container>

        <Container maxWidth="xl" sx={{ paddingY: 4, mb: 8 }}>
          <Column spacing={4}>
            <Row>
              <InputField
                label={intl.formatMessage(messages.projectNameFieldLabel)}
                placeholder={intl.formatMessage(messages.projectNameFieldPlaceholder)}
                value={projectName}
                onChange={handleProjectNameChange}
                maxLength={PROJECT_NAME_MAX_LENGTH}
                error={projectNameError}
                required
              ></InputField>
              <InputField
                label={intl.formatMessage(messages.deviceNameFieldLabel)}
                placeholder={intl.formatMessage(messages.deviceNameFieldPlaceholder)}
                value={deviceName}
                onChange={handleDeviceNameChange}
                maxLength={DEVICE_NAME_MAX_LENGTH}
                required
                error={deviceNameError}
              ></InputField>
            </Row>

            <Column component="span">
              <FormLabel required>{intl.formatMessage(messages.question1)}</FormLabel>
              <RadioGroup value={teamMembersShouldBeVisible} onChange={handleTeamMembersVisibleChange}>
                <FormControlLabel value="yes" control={<Radio />} label={intl.formatMessage(messages.yes)} />
                <FormControlLabel value="no" control={<Radio />} label={intl.formatMessage(messages.no)} />
              </RadioGroup>
            </Column>
            <Column component="span">
              <FormLabel required>{intl.formatMessage(messages.question2)}</FormLabel>
              <RadioGroup value={teamMembersObservationsEditable} onChange={handleObservationsEditableChange}>
                <FormControlLabel value="yes" control={<Radio />} label={intl.formatMessage(messages.yes)} />
                <FormControlLabel value="no" control={<Radio />} label={intl.formatMessage(messages.no)} />
              </RadioGroup>
            </Column>

            <Column component="span" spacing={1} alignItems={'flex-start'}>
              <FormLabel>{intl.formatMessage(messages.projectConfig)}</FormLabel>
              <Typography variant="caption" component="label" sx={{ fontSize: 16 }}>
                {intl.formatMessage(messages.projectConfigCaption)}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => null}
                sx={{ paddingY: 1, px: 16, borderColor: theme.grey.mid, pointerEvents: 'none' }}
              >
                {intl.formatMessage(messages.projectConfigImportButton)}
              </Button>
            </Column>
          </Column>
        </Container>

        <Row
          justifyContent="flex-end"
          sx={{ paddingY: 2, paddingX: 4, borderTop: '1px solid', borderColor: theme.grey.light }}
        >
          <Button variant="text" color="primary" sx={{ mr: 10, px: 5 }} onClick={() => handleCloseDialog()}>
            {intl.formatMessage(messages.buttonClose)}
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{ px: 5 }}
            onClick={() => handleClickCreateProject()}
          >
            {intl.formatMessage(messages.buttonCreateProject)}
          </Button>
        </Row>
      </Column>
    </Dialog>
  )
}

const InputField = ({ label, placeholder, value, onChange, maxLength, required, error }: InputFieldProps) => {
  const theme = useTheme()

  return (
    <Column sx={{ mr: 4 }}>
      <InputLabel sx={{ fontWeight: 700, color: theme.foreground, fontSize: 20, mb: 1 }} required={required}>
        {label}
      </InputLabel>
      <TextField
        placeholder={placeholder}
        error={!!error}
        inputProps={{
          maxLength: maxLength,
        }}
        InputProps={{
          endAdornment: error ? <ErrorIcon color="error" /> : null,
          sx: {
            minWidth: 400,
            mb: 1,
          },
        }}
        id="outlined-basic"
        label=""
        sx={{ width: '100%' }}
        variant="outlined"
        onChange={onChange}
        value={value}
      />

      <Row justifyContent="space-between" sx={{ width: '100%' }}>
        {error ? (
          <FormHelperText sx={{ color: theme.warningRed, fontWeight: 700, mt: 0 }}>{error}</FormHelperText>
        ) : (
          <span />
        )}
        <Typography variant="caption" align="right">
          {value.length} / {maxLength}
        </Typography>
      </Row>
    </Column>
  )
}

type InputFieldProps = {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  maxLength: number
  required: boolean
  error?: string
}

const messages = defineMessages({
  title: {
    id: 'modals.createProject.title',
    defaultMessage: 'Create a Project',
  },
  projectNameFieldLabel: {
    id: 'modals.createProject.projectNameFieldLabel',
    defaultMessage: 'Enter a name for the Project',
  },
  projectNameFieldPlaceholder: {
    id: 'modals.createProject.projectNameFieldPlaceholder',
    defaultMessage: 'Project Name',
  },
  deviceNameFieldLabel: {
    id: 'modals.createProject.deviceNameFieldLabel',
    defaultMessage: 'Add a name for your device',
  },
  deviceNameFieldPlaceholder: {
    id: 'modals.createProject.deviceNameFieldPlaceholder',
    defaultMessage: 'Device Name',
  },
  question1: {
    id: 'modals.createProject.question1',
    defaultMessage: "Can Participants see other team members' observations?",
  },
  question2: {
    id: 'modals.createProject.question2',
    defaultMessage: "Can Participants edit other team members' observations?",
  },
  yes: {
    id: 'modals.createProject.yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'modals.createProject.no',
    defaultMessage: 'No',
  },
  projectConfig: {
    id: 'modals.createProject.projectConfig',
    defaultMessage: 'Project Config',
  },
  projectConfigCaption: {
    id: 'modals.createProject.projectConfigCaption',
    defaultMessage: 'Optional. You can import a config any time.',
  },
  projectConfigImportButton: {
    id: 'modals.createProject.projectConfigImportButton',
    defaultMessage: 'Import Config',
  },
  buttonClose: {
    id: 'modals.createProject.buttonClose',
    defaultMessage: 'Close',
  },
  buttonCreateProject: {
    id: 'modals.createProject.buttonCreateProject',
    defaultMessage: 'Create Project',
  },
  projectNameRequired: {
    id: 'modals.createProject.projectNameRequired',
    defaultMessage: 'Please enter a project name',
  },
  deviceNameRequired: {
    id: 'modals.createProject.deviceNameRequired',
    defaultMessage: 'Please enter a device name',
  },
})

type CreateProjectModalProps = {
  onClose: () => void
  open: boolean
}
