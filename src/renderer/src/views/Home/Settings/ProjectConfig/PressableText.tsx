import * as React from 'react'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { spacing } from '@renderer/theme/spacing'

import { Text } from './Text'
import type { SvgIconComponent } from '@mui/icons-material'

type IconPosition = 'start' | 'end'

const IconContainer = styled.span<{ position: IconPosition }>(
  ({ position }) => `
  line-height: 0;
  margin-inline-${position === 'start' ? 'end' : 'start'}: ${spacing.small};
  font-size: 18px;
`,
)

export const PressableText = ({
  children,
  destructive,
  Icon,
  iconPosition = 'start',
  onClick,
}: React.PropsWithChildren<{
  destructive?: boolean
  onClick: () => void
  Icon?: SvgIconComponent
  iconPosition?: IconPosition
}>) => {
  const spacingStyles = {
    padding: 0,
    [iconPosition === 'start' ? 'marginRight' : 'marginLeft']: '-4px',
    [iconPosition === 'start' ? 'paddingRight' : 'paddingLeft']: spacing.small,
  }

  return (
    <Button
      color={destructive ? 'warning' : 'primary'}
      variant="text"
      onClick={onClick}
      sx={{
        ...spacingStyles,
        justifyContent: 'flex-start',
        alignItems: 'center',
        textTransform: 'none',
        minWidth: 0,
      }}
    >
      {Icon && iconPosition === 'start' ? (
        <IconContainer position="start">
          <Icon fontSize="inherit" />
        </IconContainer>
      ) : null}
      <Text size="small" color="inherit" fontWeight="500">
        {children}
      </Text>
      {Icon && iconPosition === 'end' ? (
        <IconContainer position="end">
          <Icon fontSize="inherit" />
        </IconContainer>
      ) : null}
    </Button>
  )
}
