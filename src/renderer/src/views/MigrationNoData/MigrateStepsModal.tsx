import { Dialog, Typography } from '@mui/material'
import { Button } from '@renderer/components/Button'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { theme } from '@renderer/theme'
import { defineMessages, useIntl } from 'react-intl'

const m = defineMessages({
  steps: {
    id: 'views.MigrationNoData.MigrationStepsModal.steps',
    defaultMessage: 'Migration Steps',
  },
  content: {
    id: 'views.MigrationNoData.MigrationStepsModal.content',
    defaultMessage:
      'This screen will show the animated progress of the Mapeo data migration proccess. You will not be able to do anything on Mapeo until it is complete. When Migration is complete you will be able to close the migration window. You wil then see all the data that was migrated from old mapeo to Mapeo SuperS',
  },
  close: {
    id: 'views.MigrationNoData.MigrationStepsModal.close',
    defaultMessage: 'Close',
  },
})

export const MigrateStepsModal = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) => {
  const { formatMessage: t } = useIntl()

  return (
    <Dialog open={isOpen} maxWidth="xl" fullWidth style={{ margin: 24 }} fullScreen>
      <Column justifyContent={'space-between'} flex={1}>
        <Row>
          <Column>
            <Row
              sx={{
                paddingY: 2,
                paddingX: 4,
                borderBottom: '1px solid',
                borderColor: theme.grey.light,
                width: '100%',
              }}
            >
              <Typography variant="h1" fontSize={24}>
                {t(m.steps)}
              </Typography>
            </Row>
            <Row padding={4} paddingX={10}>
              <Typography variant="h2" fontSize={20} textAlign="center">
                {t(m.content)}
              </Typography>
            </Row>
          </Column>
        </Row>
        <Row
          justifyContent={'flex-end'}
          sx={{
            paddingY: 2,
            paddingX: 4,
            borderTop: '1px solid',
            borderColor: theme.grey.light,
            width: '100%',
          }}
        >
          <Button variant="text" onClick={closeModal}>
            {t(m.close)}
          </Button>
        </Row>
      </Column>
    </Dialog>
  )
}
