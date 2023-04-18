import * as React from 'react'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { spacing } from '@renderer/theme/spacing'

import { Text } from './Text'
import type { SvgIconComponent } from '@mui/icons-material'

const IconContainer = styled.span(`
  line-height: 0;
  margin-inline-end: ${spacing.small};
  font-size: 18px;
`)

export const PressableText = ({
  Icon,
  children,
  destructive,
  onClick,
}: React.PropsWithChildren<{
  destructive?: boolean
  Icon?: SvgIconComponent
  onClick: () => void
}>) => {
  return (
    <Button
      color={destructive ? 'warning' : 'primary'}
      variant="text"
      onClick={onClick}
      sx={{
        justifyContent: 'flex-start',
        padding: 0,
        alignItems: 'center',
        textTransform: 'none',
        marginRight: '-4px',
        paddingRight: spacing.small,
        minWidth: 0,
      }}
    >
      {Icon ? (
        <IconContainer>
          <Icon fontSize="inherit" />
        </IconContainer>
      ) : null}
      <Text size="small" color="inherit" fontWeight="500">
        {children}
      </Text>
    </Button>
  )
}
