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
  ...muiButtonProps
}: React.PropsWithChildren<React.ComponentProps<typeof MuiButton>>) => {
  const theme = useTheme()
  return (
    <MuiButton
      {...muiButtonProps}
      sx={{
        borderRadius: '6px',
        backgroundColor: theme.white,
        borderColor: theme.grey.light,
        paddingY: spacing.medium,
        paddingX: spacing.large,
      }}
    >
      {typeof children === 'string' ? <ButtonText>{children}</ButtonText> : children}
    </MuiButton>
  )
}
