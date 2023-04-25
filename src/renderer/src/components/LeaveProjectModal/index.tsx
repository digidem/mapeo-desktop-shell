import { Dialog } from '@mui/material'
import { useState } from 'react'
import { LeaveProjectConfirmation } from './LeaveProjectConfirmation'
import { DeleteData } from './DeleteData'
import { SuccessfulLeave } from './SuccessfulLeave'

type LeaveProjectModalProps = {
  isOpen: boolean
  closeModal: () => void
  projectName: string
}

export const LeaveProjectModal = ({ isOpen, closeModal, projectName }: LeaveProjectModalProps) => {
  function handleCloseDialog(event?: Record<string, never>, reason?: 'escapeKeyDown' | 'backdropClick') {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
    closeModal()
  }

  const [modalContent, setModalContent] = useState<'confirmation' | 'deleteData' | 'successfulLeave'>(
    'confirmation',
  )

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog} maxWidth="xl" fullWidth>
      {modalContent === 'confirmation' && (
        <LeaveProjectConfirmation
          projectName={projectName}
          moveToDeleteDataContent={() => {
            setModalContent('deleteData')
          }}
        />
      )}

      {modalContent === 'deleteData' && (
        <DeleteData
          setToSuccess={() => {
            setModalContent('successfulLeave')
          }}
          projectName={projectName}
        />
      )}

      {modalContent === 'successfulLeave' && <SuccessfulLeave projectName={projectName} />}
    </Dialog>
  )
}
