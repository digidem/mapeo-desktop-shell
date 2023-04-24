import { Dialog } from '@mui/material'
import { useState } from 'react'
import { LeaveProjectConfirmation } from './LeaveProjectConfirmation'
import { DeleteData } from './DeleteData'
import { SuccessfulLeave } from './SuccessfulLeave'

type LeaveProjectModalProps = {
  isOpen?: boolean
  close?: () => void
  projectName: string
}

export const LeaveProjectModal = ({ projectName }: LeaveProjectModalProps) => {
  function handleCloseDialog(event?: Record<string, never>, reason?: 'escapeKeyDown' | 'backdropClick') {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
    //close()
  }

  const [modalContent, setModalContent] = useState<'confirmation' | 'deleteData' | 'successfulLeave'>(
    'confirmation',
  )

  return (
    <Dialog open={true} onClose={handleCloseDialog} maxWidth="xl" fullWidth>
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
