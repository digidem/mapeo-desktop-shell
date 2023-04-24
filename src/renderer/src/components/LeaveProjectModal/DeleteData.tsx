import { LinearProgress, Typography } from '@mui/material'
import { Column, Row } from '../LayoutComponents'
import { defineMessages, useIntl } from 'react-intl'
import { MEDIA } from '@renderer/lib/Observations'
import { useEffect, useRef, useState } from 'react'

const m = defineMessages({
  leaveProject: {
    id: 'components.LeaveProjectModal.DeleteData.leaveProject',
    defaultMessage: 'Leaving Project {projectName}',
  },
  deletingData: {
    id: 'components.LeaveProjectModal.DeleteData.deletingData',
    defaultMessage: 'Deleting {data}mb of data',
  },
})

type DeleteDataProps = {
  setToSuccess: () => void
  projectName: string
}

export const DeleteData = ({ setToSuccess, projectName }: DeleteDataProps) => {
  const { formatMessage: t } = useIntl()
  const [progress, setProgress] = useState(0)
  const interval = useRef<NodeJS.Timeout>()

  const completed = progress >= 100

  console.log(progress)

  useEffect(() => {
    interval.current = setInterval(() => {
      setProgress((value) => value + 1)
    }, 100)

    return () => {
      clearInterval(interval.current)
    }
  }, [])

  useEffect(() => {
    if (completed) {
      clearInterval(interval.current)
      setTimeout(() => {
        setToSuccess()
      }, 1000)
    }
  }, [completed])

  return (
    <Column sx={{ minHeight: '85vh', padding: 4, pt: '10vh' }} spacing={6} alignItems="center">
      <Row>
        <Typography variant="h1" fontWeight={500} fontSize={24}>
          {t(m.leaveProject, { projectName })}
        </Typography>
      </Row>
      <Row>
        <Typography variant="h2" fontWeight={400} fontSize={20}>
          {t(m.deletingData, { data: MEDIA * 3 })}
        </Typography>
      </Row>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ borderRadius: 5, height: 8, width: '100%' }}
      />
    </Column>
  )
}