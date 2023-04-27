import { useState } from 'react'
import { DeleteData } from './DeleteData'
import { LeaveProjectConfirmation } from './LeaveProjectConfirmation'
import { SuccessfulLeave } from './SuccessfulLeave'

export const LeaveProjectContent = ({ closeModal }: { closeModal: () => void }) => {
  const [modalContent, setModalContent] = useState<'confirmation' | 'deleteData' | 'successfulLeave'>(
    'confirmation',
  )

  if (modalContent === 'confirmation') {
    return (
      <LeaveProjectConfirmation
        closeModal={closeModal}
        moveToDeleteDataContent={() => {
          setModalContent('deleteData')
        }}
      />
    )
  }

  if (modalContent === 'deleteData') {
    return (
      <DeleteData
        setToSuccess={() => {
          setModalContent('successfulLeave')
        }}
      />
    )
  }

  if (modalContent === 'successfulLeave') {
    return <SuccessfulLeave />
  }

  return null
}
