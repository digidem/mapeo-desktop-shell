import * as React from 'react'
import { Typography, useTheme } from '@mui/material'

export const Text = ({
  children,
  color,
  fontWeight,
  variant,
  size,
}: React.PropsWithChildren<{
  color?: React.ComponentProps<typeof Typography>['color']
  fontWeight?: React.ComponentProps<typeof Typography>['fontWeight']
  variant?: React.ComponentProps<typeof Typography>['variant']
  size: 'small' | 'medium' | 'large'
}>) => {
  const theme = useTheme()

  const fontSize = size === 'small' ? 16 : size === 'medium' ? 18 : 24

  return (
    <Typography
      variant={variant}
      color={color || theme.black}
      fontWeight={fontWeight}
      fontSize={`${variant && variant.startsWith('h') ? fontSize * 1.2 : fontSize}px`}
      textTransform="none"
    >
      {children}
    </Typography>
  )
}
