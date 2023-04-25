import { Typography } from '@mui/material'
import { Column, Row } from '../LayoutComponents'
import { defineMessages, useIntl } from 'react-intl'
import { MEDIA, OBSERVATIONS } from '@renderer/lib/Observations'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { theme } from '@renderer/theme'
import { Button } from '../Button'
import { Link, redirect } from 'react-router-dom'
import { useMapeoDeviceStore } from '@renderer/hooks/stores/mapeoDeviceStore'

const m = defineMessages({
  leftProject: {
    id: 'components.LeaveProjectModal.DeleteData.leftProject',
    defaultMessage: 'You have left Project {projectName}',
  },
  deletedData: {
    id: 'components.LeaveProjectModal.DeleteData.deletedData',
    defaultMessage: 'Deleted {observations}/{observations} observations and {data}mb of data',
  },
  close: {
    id: 'components.LeaveProjectModal.DeleteData.close',
    defaultMessage: 'Close',
  },
})

export const SuccessfulLeave = () => {
  const { formatMessage: t } = useIntl()
  const projectName = useMapeoDeviceStore((store) => store.projectName)

  return (
    <Column
      sx={{ minHeight: '85vh', padding: 4, pt: '10vh' }}
      spacing={6}
      alignItems="center"
      justifyContent={'space-between'}
    >
      <Row>
        <Column spacing={6} alignItems="center">
          <CheckCircleIcon style={{ fontSize: 100 }} />
          <Row>
            <Typography variant="h1" fontWeight={500} fontSize={24}>
              {t(m.leftProject, { projectName })}
            </Typography>
          </Row>
          <Row>
            <Typography variant="h2" fontWeight={400} fontSize={20}>
              {t(m.deletedData, { observations: OBSERVATIONS, data: MEDIA * 3 })}
            </Typography>
          </Row>
        </Column>
      </Row>

      <Row
        justifyContent="flex-end"
        sx={{
          paddingY: 2,
          paddingX: 4,
          borderTop: '1px solid',
          borderColor: theme.grey.light,
          width: '100%',
        }}
      >
        <Link to="/migration-no-data" state={{ hasLeftProject: true }}>
          <Button variant="text" onClick={() => {}}>
            {t(m.close)}
          </Button>
        </Link>
      </Row>
    </Column>
  )
}
