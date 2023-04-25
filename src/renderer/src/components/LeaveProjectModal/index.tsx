import { Dialog } from '@mui/material'
import { useState } from 'react'
import { LeaveProjectConfirmation } from './LeaveProjectConfirmation'
import { DeleteData } from './DeleteData'
import { SuccessfulLeave } from './SuccessfulLeave'

type LeaveProjectModalProps = {
  isOpen: boolean
  closeModal: () => void
}

export const LeaveProjectModal = ({ isOpen, closeModal }: LeaveProjectModalProps) => {
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
        />
      )}

      {modalContent === 'successfulLeave' && <SuccessfulLeave />}
    </Dialog>
  )
}
