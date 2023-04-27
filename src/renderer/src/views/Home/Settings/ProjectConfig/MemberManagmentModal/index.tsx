import { Dialog } from '@mui/material'
import { LeaveProjectContent } from './LeaveProjectContent'
import { DeviceInfoContent } from './DeviceInfoContent'

export type MemberManagementModalContent = { type: 'leaveProject' } | { type: 'memberInfo'; deviceId: string }

type LeaveProjectModalProps = {
  isOpen: boolean
  closeModal: () => void
  content: MemberManagementModalContent
  resetOnDelete: () => void
}

export const MemberManagementModal = ({
  isOpen,
  closeModal,
  content,
  resetOnDelete,
}: LeaveProjectModalProps) => {
  function handleCloseDialog(event?: Record<string, never>, reason?: 'escapeKeyDown' | 'backdropClick') {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
    closeModal()
  }

  return (
    <Dialog
      transitionDuration={{ exit: 0 }}
      open={isOpen}
      onClose={handleCloseDialog}
      maxWidth="xl"
      fullScreen
      fullWidth
      sx={{ margin: '24px' }}
    >
      {content.type === 'leaveProject' && <LeaveProjectContent closeModal={closeModal} />}

      {content.type === 'memberInfo' && (
        <DeviceInfoContent
          resetOnDelete={resetOnDelete}
          deviceId={content.deviceId}
          closeModal={closeModal}
        />
      )}
    </Dialog>
  )
}
