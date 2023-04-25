import { ReactNode } from 'react'
import { DefaultLayout } from '../default'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { styled, useTheme } from '@mui/material'
import { Logo } from '@renderer/components/Logo'

export const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  return (
    <DefaultLayout langBackgroundVarient="dark">
      <Row sx={{ height: '100vh' }}>
        <Column sx={{ bgcolor: theme.white, flex: 5, padding: '6em 5em 3em 5em' }}>{children}</Column>

        <Contents
          sx={{
            height: '100%',
            flex: 4,
            backgroundColor: theme.primary,
            flexDirection: 'column',
            padding: '6em 8em',
          }}
        >
          <Logo />
        </Contents>
      </Row>
    </DefaultLayout>
  )
}

export const Contents = styled(Column)`
  justify-content: center;
  align-items: center;
`
