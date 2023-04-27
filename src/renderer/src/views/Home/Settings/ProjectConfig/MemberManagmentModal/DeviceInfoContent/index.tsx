import { Fragment, useState } from 'react'
import { DeviceInfo } from './DeviceInfo'
import { ConfirmRemoveDevice } from './ConfirmRemoveDevice'

type DeviceInfoModalProps = {
  closeModal: () => void
  deviceId?: string
  resetOnDelete: () => void
}

export const DeviceInfoContent = ({ closeModal, deviceId, resetOnDelete }: DeviceInfoModalProps) => {
  const [modalState, setModalState] = useState<'deviceInfo' | 'confirmDelete'>('deviceInfo')

  if (!deviceId) return null

  return (
    <Fragment>
      {modalState === 'deviceInfo' ? (
        <DeviceInfo
          closeModal={closeModal}
          deviceId={deviceId}
          moveToConfirmationScreen={() => setModalState('confirmDelete')}
        />
      ) : (
        <ConfirmRemoveDevice resetOnDelete={resetOnDelete} deviceId={deviceId} closeModal={closeModal} />
      )}
    </Fragment>
  )
}
