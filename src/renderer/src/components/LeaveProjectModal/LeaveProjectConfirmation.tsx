import { Checkbox, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Column, Row } from '../LayoutComponents'
import { defineMessages, useIntl } from 'react-intl'
import { Button } from '../Button'
import { MEDIA, OBSERVATIONS } from '@renderer/lib/Observations'
import { useState } from 'react'
import { theme } from '@renderer/theme'
import { useMapeoDeviceStore } from '@renderer/hooks/stores/mapeoDeviceStore'

const m = defineMessages({
  leaveConfirmation: {
    id: 'components.LeaveProjectModal.leaveConfirmation',
    defaultMessage: 'Are you sure you want to leave project {projectName}',
  },
  deleteWarning: {
    id: 'components.LeaveProjectModal.deleteWarning',
    defaultMessage:
      'This will delete {observations} observations and {mediaSize}mb of data from this device.',
  },
  unsyncedWarningTitle: {
    id: 'components.LeaveProjectModal.unsyncedWarningTitle',
    defaultMessage: '5 unsynced changes',
  },
  unsyncedWarningMessage: {
    id: 'components.LeaveProjectModal.unsyncedWarningMessage',
    defaultMessage: 'Sync with a team member so you don’t lose these edits or observations',
  },
  checkConfirmation: {
    id: 'components.LeaveProjectModal.checkConfirmation',
    defaultMessage: 'I understand I will be deleting all data from Project {name} from my device',
  },
  leaveProject: {
    id: 'components.LeaveProjectModal.leaveProject',
    defaultMessage: 'Leave Project',
  },
  cancel: {
    id: 'components.LeaveProjectModal.cancel',
    defaultMessage: 'Cancel',
  },
})

type LeaveProjectModalProps = {
  close?: () => void
  moveToDeleteDataContent: () => void
}

export const LeaveProjectConfirmation = ({ moveToDeleteDataContent }: LeaveProjectModalProps) => {
  const { formatMessage: t } = useIntl()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState(false)
  const projectName = useMapeoDeviceStore((store) => store.projectName)

  function validateAndLeaveProject() {
    if (!confirmDelete) {
      setError(true)
      return
    }

    moveToDeleteDataContent()
  }

  function onClickCheckbox() {
    if (error) setError(false)
    setConfirmDelete((value) => !value)
  }

  return (
    <Column sx={{ minHeight: '85vh', padding: 4, pt: '10vh' }} spacing={6} alignItems="center">
      <ErrorIcon style={{ fontSize: 100 }} />
      <Row>
        <Typography variant="h1" fontSize={24} align="center">
          {t(m.leaveConfirmation, { projectName })}
        </Typography>
      </Row>
      <Row>
        <Typography variant="h2" fontSize={22} align="center">
          {t(m.deleteWarning, { observations: OBSERVATIONS, mediaSize: MEDIA * 3 })}
        </Typography>
      </Row>
      <Row alignItems={'center'} padding={2} style={{ backgroundColor: '#F6F6F6' }}>
        <Column>
          <WarningAmberIcon style={{ marginRight: 20 }} fontSize="large" />
        </Column>
        <Column>
          <Typography variant="body1" fontSize={16} fontWeight={700}>
            {t(m.unsyncedWarningTitle)}
          </Typography>
          <Typography variant="body1" fontSize={16}>
            {t(m.unsyncedWarningMessage)}
          </Typography>
        </Column>
      </Row>
      <Row alignItems={'center'}>
        <Column>
          <Checkbox
            style={error ? { color: theme.warningRed } : undefined}
            onClick={onClickCheckbox}
            value={confirmDelete}
          />
        </Column>
        <Column>
          <Typography style={error ? { color: theme.warningRed } : undefined} variant="body1" fontSize={16}>
            {t(m.checkConfirmation, { name: projectName })}
          </Typography>
        </Column>
      </Row>

      <Row
        justifyContent="space-between"
        sx={{
          paddingY: 2,
          paddingX: 4,
          borderTop: '1px solid',
          borderColor: theme.grey.light,
          width: '100%',
        }}
      >
        <Button color="error" variant="contained" onClick={validateAndLeaveProject}>
          {t(m.leaveProject)}
        </Button>

        <Button variant="text" onClick={close}>
          {t(m.cancel)}
        </Button>
      </Row>
    </Column>
  )
}
