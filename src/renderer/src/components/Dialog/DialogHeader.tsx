import * as React from 'react'
import { DialogTitle, useTheme } from '@mui/material'
import { Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'

export const DialogHeader = ({ children, title }: React.PropsWithChildren<{ title: string }>) => {
  const theme = useTheme()

  return (
    <Row
      borderBottom={`1px solid ${theme.grey.light}`}
      padding={spacing.large}
      justifyContent="space-between"
      alignItems="center"
    >
      <DialogTitle fontWeight="600" fontSize="24px" sx={{ padding: 0 }}>
        {title}
      </DialogTitle>
      {children}
    </Row>
  )
}
