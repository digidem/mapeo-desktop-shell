import { Typography } from '@mui/material'
import { Column, Row } from '../LayoutComponents'
import { defineMessages, useIntl } from 'react-intl'
import { MEDIA, OBSERVATIONS } from '@renderer/lib/Observations'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const m = defineMessages({
  leftProject: {
    id: 'components.LeaveProjectModal.DeleteData.leftProject',
    defaultMessage: 'You have left Project {projectName}',
  },
  deletedData: {
    id: 'components.LeaveProjectModal.DeleteData.deletedData',
    defaultMessage: 'Deleted {observations}/{observations} observations and {data}mb of data',
  },
})

type SuccessfulLeaveProps = {
  projectName: string
}

export const SuccessfulLeave = ({ projectName }: SuccessfulLeaveProps) => {
  const { formatMessage: t } = useIntl()

  return (
    <Column sx={{ minHeight: '85vh', padding: 4, pt: '10vh' }} spacing={6} alignItems="center">
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
  )
}
