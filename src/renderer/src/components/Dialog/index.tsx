import * as React from 'react'
import { Dialog as MuiDialog, DialogContent } from '@mui/material'

export { DialogHeader } from './DialogHeader'
export { DialogActionsFooter } from './DialogActionsFooter'

export const Dialog = ({
  children,
  footer,
  header,
  onClose,
  onCloseEnd,
  open,
}: React.PropsWithChildren<{
  header?: React.ReactNode
  footer?: React.ReactNode
  onClose: () => void
  onCloseEnd?: () => void
  open: boolean
}>) => {
  return (
    <MuiDialog
      open={open}
      onClose={(_, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
        onClose()
      }}
      TransitionProps={
        onCloseEnd
          ? {
              onExited: onCloseEnd,
            }
          : undefined
      }
      fullScreen
      sx={{ margin: '48px' }}
    >
      {header}
      <DialogContent sx={{ display: 'flex', padding: 0 }}>{children}</DialogContent>
      {footer}
    </MuiDialog>
  )
}
