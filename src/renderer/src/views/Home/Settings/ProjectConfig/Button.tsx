import * as React from 'react'
import { Button as MuiButton, useTheme } from '@mui/material'
import { spacing } from '@renderer/theme/spacing'

import { Text } from './Text'

export const ButtonText = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Text variant="button" size="small" color="inherit">
      {children}
    </Text>
  )
}

export const Button = ({
  children,
  noBorder,
  sx,
  ...muiButtonProps
}: React.PropsWithChildren<React.ComponentProps<typeof MuiButton> & { noBorder?: boolean }>) => {
  const theme = useTheme()

  return (
    <MuiButton
      {...muiButtonProps}
      sx={{
        backgroundColor: theme.white,
        border: `1px solid ${noBorder ? 'transparent' : theme.grey.light}`,
        borderRadius: '6px',
        paddingY: spacing.medium,
        paddingX: spacing.large,
        ...sx,
      }}
    >
      {typeof children === 'string' ? <ButtonText>{children}</ButtonText> : children}
    </MuiButton>
  )
}
