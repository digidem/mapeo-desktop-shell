import { useState, useEffect } from 'react'
import { CircularProgress, Dialog, Typography, useTheme } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import { Column, Row } from '../LayoutComponents'
import { defineMessages, useIntl } from 'react-intl'
import { Button } from '../Button'

export const SkipMigrationModal = ({ open, onClose }: SkipMigrationModalModalProps) => {
  const intl = useIntl()
  const theme = useTheme()
  const [skipped, setSkipped] = useState(false)
  let timeout

  useEffect(() => {
    return () => {
      if (timeout) {
        timeout.clear()
      }
    }
  }, [])

  const handleCloseDialog = (event?: Record<string, never>, reason?: 'escapeKeyDown' | 'backdropClick') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="xl" fullWidth>
      <Column justifyContent="space-between" alignItems="stretch">
        <Column sx={{ minHeight: '85vh', padding: 4, pt: '10vh' }} spacing={6} alignItems="center">
          <Row justifyContent="center">
            <ErrorIcon sx={{ height: '100px', width: '100px' }} color="error" />
          </Row>
          <Typography variant="h1" align="center">
            {intl.formatMessage(messages.title)}
          </Typography>
          <span>
            {!skipped ? (
              <>
                <Typography variant="body1" align="center">
                  {intl.formatMessage(messages.message1)}
                </Typography>
                <Typography variant="body1" align="center">
                  {intl.formatMessage(messages.message2)}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" align="center">
                {intl.formatMessage(messages.skippedMessage)}
              </Typography>
            )}
          </span>
        </Column>
        <Row
          justifyContent={skipped ? 'flex-end' : 'space-between'}
          sx={{ paddingY: 2, paddingX: 4, borderTop: '1px solid', borderColor: theme.grey.light }}
        >
          {!skipped ? (
            <Button variant="text" color="error" onClick={() => setSkipped(true)}>
              {intl.formatMessage(messages.buttonSkip)}
            </Button>
          ) : null}
          <Button variant="text" color="primary" onClick={onClose}>
            {skipped ? intl.formatMessage(messages.buttonClose) : intl.formatMessage(messages.buttonCancel)}
          </Button>
        </Row>
      </Column>
    </Dialog>
  )
}

const messages = defineMessages({
  title: {
    id: 'components.skipMigrationModal.title',
    defaultMessage: 'Skip Migration',
  },
  message1: {
    id: 'components.skipMigrationModal.message1',
    defaultMessage: 'Your previous Mapeo data will not be visible in the new Mapeo apps.',
  },
  message2: {
    id: 'components.skipMigrationModal.message2',
    defaultMessage: 'Please proceed with caution.',
  },
  skippedMessage: {
    id: 'components.skipMigrationModal.skippedMessage',
    defaultMessage: 'Join a project or create a project',
  },
  buttonSkip: {
    id: 'components.skipMigrationModal.buttonSkip',
    defaultMessage: 'Skip Migration',
  },
  buttonCancel: {
    id: 'components.skipMigrationModal.buttonCancel',
    defaultMessage: 'Cancel',
  },
  buttonClose: {
    id: 'components.skipMigrationModal.buttonClose',
    defaultMessage: 'Close',
  },
})

type SkipMigrationModalModalProps = {
  onClose: () => void
  open: boolean
}
