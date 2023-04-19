import * as React from 'react'
import { useTheme } from '@mui/material'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'

import desktopImageUrl from '../../../../../assets/desktop.png'
import mobileImageUrl from '../../../../../assets/mobile.png'
import { Button } from './Button'
import { Text } from './Text'
import { Peer } from '.'

const SHARED_CONTAINER_STYLES = {
  maxWidth: '400px',
  minWidth: '300px',
  borderRadius: '6px',
  padding: spacing.large,
}

const Container = ({ pressable, children }: React.PropsWithChildren<{ pressable?: boolean }>) => {
  const theme = useTheme()

  return pressable ? (
    <Button sx={SHARED_CONTAINER_STYLES}>{children}</Button>
  ) : (
    <Row
      padding={spacing.large}
      alignItems="center"
      sx={{
        ...SHARED_CONTAINER_STYLES,
        backgroundColor: theme.white,
        border: `1px solid ${theme.grey.light}`,
      }}
    >
      {children}
    </Row>
  )
}

interface Props {
  dateText?: string
  deviceType: Peer['deviceType']
  pressableAction?: React.ReactNode
  subtitle?: string
  title: string
  onClick?: () => void
}

export const PeerCard = ({ dateText, deviceType, pressableAction, subtitle, title, onClick }: Props) => {
  const theme = useTheme()
  return (
    <Container pressable={!!onClick}>
      <Column marginRight={spacing.medium}>
        <img
          src={deviceType === 'desktop' ? desktopImageUrl : mobileImageUrl}
          style={{ display: 'block', maxWidth: '100%', width: '40px' }}
        />
      </Column>
      <Column flex={1}>
        <Row justifyContent="space-between">
          <Text size="small" fontWeight="600">
            {title}
          </Text>
          {dateText && (
            <Text size="small" color={theme.grey.main}>
              {dateText}
            </Text>
          )}
        </Row>
        <Row justifyContent="space-between">
          {subtitle && (
            <Text size="small" color={theme.grey.main}>
              {subtitle}
            </Text>
          )}
          {pressableAction}
        </Row>
      </Column>
    </Container>
  )
}
