import { ReactNode } from 'react'
import { DefaultLayout } from '../default'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { styled, useTheme } from '@mui/material'
import { Logo } from '@renderer/components/Logo'

export const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  return (
    <DefaultLayout>
      <Row flex={1} sx={{ height: '100vh' }}>
        <Column sx={{ bgcolor: theme.white, padding: '4em 3em', maxWidth: '60%' }}>{children}</Column>

        <Contents
          sx={{
            flex: 1,
            height: '100%',
            backgroundColor: theme.primary,
            flexDirection: 'column',
            overflow: 'auto',
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
