import { Container, Dialog, Typography, useTheme } from '@mui/material'
import { Column, Row } from '../LayoutComponents'
import { defineMessages, useIntl } from 'react-intl'
import { Button } from '../Button'

export const JoinProjectModal = ({ open, onClose }: JoinProjectModalProps) => {
  const intl = useIntl()
  const theme = useTheme()

  const handleCloseDialog = (event?: Record<string, never>, reason?: 'escapeKeyDown' | 'backdropClick') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="xl" fullWidth scroll="body">
      <Column justifyContent="space-between" sx={{ minHeight: '85vh' }}>
        <Container
          maxWidth="xl"
          sx={{ paddingY: 4, borderBottom: '1px solid', borderColor: theme.grey.light }}
        >
          <Typography variant="h3" component="h1">
            {intl.formatMessage(messages.title)}
          </Typography>
        </Container>

        <Container maxWidth="xl" sx={{ paddingY: 4, mb: 8 }}>
          <Column spacing={4} justifyContent="center" alignItems="center">
            <Typography variant="h2" fontSize={24}>
              {intl.formatMessage(messages.message)}
            </Typography>
          </Column>
        </Container>

        <Row
          justifyContent="flex-end"
          sx={{ paddingY: 2, paddingX: 4, borderTop: '1px solid', borderColor: theme.grey.light }}
        >
          <Button variant="text" color="primary" sx={{ px: 5 }} onClick={() => handleCloseDialog()}>
            {intl.formatMessage(messages.buttonClose)}
          </Button>
        </Row>
      </Column>
    </Dialog>
  )
}

const messages = defineMessages({
  title: {
    id: 'modals.joinProject.title',
    defaultMessage: 'Join Project',
  },
  message: {
    id: 'modals.joinProject.message',
    defaultMessage: 'End of path. Testing how to join a project is not availabe for now.',
  },
  buttonClose: {
    id: 'modals.joinProject.buttonClose',
    defaultMessage: 'Close',
  },
})

type JoinProjectModalProps = {
  onClose: () => void
  open: boolean
}
