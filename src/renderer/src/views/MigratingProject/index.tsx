import { Button, Container, LinearProgress, Typography, useTheme } from '@mui/material'
import CheckIcon from '@mui/icons-material/CheckCircleRounded'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { Logo, Mapeo5Logo } from '@renderer/components/Logo'
import { DefaultLayout } from '@renderer/layouts/default'
import { useCallback, useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'

const INTERVAL_DURATION = 250

type LocationState = { observations: number; media: number }

export const MigratingProjectView = () => {
  const theme = useTheme()
  const { state } = useLocation()
  const locationState = state as LocationState
  const intl = useIntl()
  const observationsTotal = locationState.observations
  const mediaTotal = locationState.media
  const total = observationsTotal + mediaTotal
  const [observationsMigrated, setObservationsMigrated] = useState(0)
  const [mediaMigrated, setMediaMigrated] = useState(0)

  const updateProgress = useCallback(() => {
    console.log('update')
    const obsMigrating = Math.floor(Math.random() * 6)
    const mediaMigrating = Math.floor(Math.random() * 6)

    setObservationsMigrated((prevObservationsMigrated) =>
      prevObservationsMigrated + obsMigrating < observationsTotal
        ? prevObservationsMigrated + obsMigrating
        : observationsTotal,
    )
    setMediaMigrated((prevMediaMigrated) =>
      prevMediaMigrated + mediaMigrating < mediaTotal ? prevMediaMigrated + mediaMigrating : mediaTotal,
    )
  }, [total])

  const interval = useRef<NodeJS.Timer | undefined>()

  const progress = ((mediaMigrated + observationsMigrated) / total) * 100

  if (progress >= 100 && interval.current) {
    console.log('stop')
    clearInterval(interval.current)
    interval.current = undefined
  }

  useEffect(() => {
    interval.current = setInterval(updateProgress, INTERVAL_DURATION)

    return () => {
      clearInterval(interval.current)
    }
  }, [interval])

  useEffect(() => {
    if (observationsMigrated === observationsTotal && mediaMigrated === mediaTotal) {
      clearInterval(interval.current)
    }
  }, [observationsMigrated, observationsTotal, mediaMigrated, mediaTotal])

  return (
    <DefaultLayout
      sx={{
        backgroundColor: theme.background,
        display: 'grid',
        gridTemplateRows: 'auto minmax(auto, 75px)',
        gridTemplateColumns: '1fr',
      }}
    >
      <Container maxWidth="lg" sx={{ pt: '15vh' }}>
        <Column spacing={16} alignItems="center">
          <Container maxWidth="sm">
            <Row alignItems="center" justifyContent={progress === 100 ? 'center' : 'space-between'}>
              {progress !== 100 ? (
                <>
                  <Mapeo5Logo />
                  <ArrowsSvg />
                </>
              ) : null}
              <Logo textColourVariant="dark" />
            </Row>
          </Container>

          <Container maxWidth="md">
            <Column justifyContent="space-between" alignItems="center" spacing={4}>
              <Row>
                {progress === 100 ? (
                  <CheckIcon sx={{ mr: 3, color: theme.successGreen, height: 30, width: 30 }} />
                ) : null}
                <Typography variant="h3" component="label" fontWeight="700" align="center">
                  {intl.formatMessage(progress === 100 ? messages.complete : messages.migrating)}
                </Typography>
              </Row>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ borderRadius: 5, height: 8, width: '100%' }}
              ></LinearProgress>
              <Row justifyContent="space-between" sx={{ width: '100%' }}>
                <Typography variant="body1" component="label">
                  {observationsMigrated}/{observationsTotal} {intl.formatMessage(messages.observations)}
                </Typography>
                <Typography variant="body1" component="label">
                  {mediaMigrated}/{mediaTotal} {intl.formatMessage(messages.media)}
                </Typography>
              </Row>
            </Column>
          </Container>
        </Column>
      </Container>
      {progress === 100 ? (
        <Row
          justifyContent="flex-end"
          sx={{
            paddingY: 2,
            paddingX: 4,
            borderTop: '1px solid',
            borderColor: theme.grey.light,
          }}
        >
          <Link to="/migration-complete">
            <Button
              onClick={() => {}}
              variant="contained"
              color="secondary"
              disableElevation
              disableRipple
              sx={{ textTransform: 'none', fontWeight: 700, paddingX: 5 }}
            >
              {intl.formatMessage(messages.next)}
            </Button>
          </Link>
        </Row>
      ) : null}
    </DefaultLayout>
  )
}

const ArrowsSvg = () => (
  <svg width="117" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M.904 39.997h24.18L45.08 20 26.175 1.093 25.083 0H.904l19.998 19.997L7.085 33.814l-6.18 6.183Zm25.088-19.999L9.63 3.637h14l16.36 16.361L23.63 36.36h-14l16.362-16.362Z"
      fill="#CCCCD6"
    />
    <path
      d="M36.722.003H60.9l.91 1.093 18.906 18.907L60.719 40h-24.18l6.364-6.183L56.719 20 36.722.003Z"
      fill="#CCCCD6"
    />
    <path
      d="M97.62 1.092 96.71 0H72.35l19.997 19.997-13.816 13.817-6.181 6.183h24.18L116.525 20l-2.545-2.545L97.62 1.092Zm-2.545 35.27h-14L97.438 20 81.076 3.638h13.999L111.436 20 95.075 36.36Z"
      fill="#CCCCD6"
    />
  </svg>
)

const messages = defineMessages({
  migrating: {
    id: 'views.migratingProject.migrating',
    defaultMessage: 'Migrating Project...',
  },
  complete: {
    id: 'views.migratingProject.complete',
    defaultMessage: 'Migration complete!',
  },
  observations: {
    id: 'views.migratingProject.observations',
    defaultMessage: 'observations',
  },
  media: {
    id: 'views.migratingProject.media',
    defaultMessage: 'media',
  },
  next: {
    id: 'views.migratingProject.next',
    defaultMessage: 'Next',
  },
})
