import * as React from 'react'
import { DialogActions, useTheme } from '@mui/material'
import { Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'

type Props = {
  justifyContent?: React.CSSProperties['justifyContent']
} & ( // At least one of leftButton or rightButton must be provided
  | {
      leftButton?: React.ReactNode
      rightButton: React.ReactNode
    }
  | {
      rightButton?: React.ReactNode
      leftButton: React.ReactNode
    }
)

export const DialogActionsFooter = ({ justifyContent = 'flex-end', leftButton, rightButton }: Props) => {
  const theme = useTheme()

  return (
    <DialogActions sx={{ borderTop: `1px solid ${theme.grey.light}`, paddingX: spacing.large }}>
      <Row spacing={spacing.large} alignItems="center" justifyContent={justifyContent} flex={1}>
        {leftButton}
        {rightButton}
      </Row>
    </DialogActions>
  )
}
