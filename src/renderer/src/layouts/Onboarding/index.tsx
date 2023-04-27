import { ReactNode } from 'react'
import { DefaultLayout } from '../default'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { useTheme } from '@mui/material'
import { Logo } from '@renderer/components/Logo'
import { spacing } from '@renderer/theme/spacing'

export const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  return (
    <DefaultLayout>
      <Row>
        <Column sx={{ bgcolor: theme.white, padding: spacing.large, maxWidth: '60%' }}>{children}</Column>

        <Column
          flex={1}
          justifyContent="center"
          alignItems="center"
          sx={{ flex: 1, backgroundColor: theme.primary }}
        >
          <Logo />
        </Column>
      </Row>
    </DefaultLayout>
  )
}
