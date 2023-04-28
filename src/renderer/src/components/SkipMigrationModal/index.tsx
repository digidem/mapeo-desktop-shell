import { Dialog, Typography, useTheme } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import { Column, Row } from '../LayoutComponents'
import { defineMessages, useIntl } from 'react-intl'
import { Button } from '../Button'
import { Link } from 'react-router-dom'

export const SkipMigrationModal = ({ open, onClose }: SkipMigrationModalModalProps) => {
  const intl = useIntl()
  const theme = useTheme()

  const handleCloseDialog = (event?: Record<string, never>, reason?: 'escapeKeyDown' | 'backdropClick') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="xl" fullWidth scroll="body">
      <Column justifyContent="space-between" alignItems="stretch">
        <Column sx={{ minHeight: '85vh', padding: 4, pt: '10vh' }} spacing={6} alignItems="center">
          <Row justifyContent="center">
            <ErrorIcon sx={{ height: '100px', width: '100px' }} color="error" />
          </Row>
          <Typography variant="h1" align="center">
            {intl.formatMessage(messages.title)}
          </Typography>
          <span style={{ padding: '0 5em' }}>
            <Typography variant="body1" align="center">
              {intl.formatMessage(messages.message1)}
            </Typography>
            <Typography variant="body1" align="center">
              {intl.formatMessage(messages.message2)}
            </Typography>
            <Typography variant="body1" align="center">
              {intl.formatMessage(messages.message3)}
            </Typography>
            <Typography variant="body1" align="center">
              {intl.formatMessage(messages.message4)}
            </Typography>
          </span>
        </Column>
        <Row
          justifyContent={'space-between'}
          sx={{ paddingY: 2, paddingX: 4, borderTop: '1px solid', borderColor: theme.grey.light }}
        >
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <Button variant="text" color="error" onClick={() => {}}>
              {intl.formatMessage(messages.buttonSkip)}
            </Button>
          </Link>

          <Button variant="text" color="primary" onClick={onClose}>
            {intl.formatMessage(messages.buttonCancel)}
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
    defaultMessage: 'You will start Mapeo SuperS with a new empty project.',
  },
  message2: {
    id: 'components.skipMigrationModal.message2',
    defaultMessage:
      'If you have synchronized you data to another computer that is performing data migrations, and you want to continue colaborating, you need to receive an invitation from that device to join its project. After joining the project and synchronizing you will be able to see your previous data and add new data using MapeoSuperS.',
  },
  message3: {
    id: 'components.skipMigrationModal.message3',
    defaultMessage:
      'If you have not synchronized your data to another computer and you want to continue seeing your data with MapeoSuperS, you will need to go back and migrate your data or use Mapeo 5 to synchronize with the computer designated for migration first.',
  },
  message4: {
    id: 'components.skipMigrationModal.message4',
    defaultMessage:
      'You can skip this now and data will not be lost. It will just not be visible in MapeoSuperS. To migrate your data later, find out more',
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
})

type SkipMigrationModalModalProps = {
  onClose: () => void
  open: boolean
}
