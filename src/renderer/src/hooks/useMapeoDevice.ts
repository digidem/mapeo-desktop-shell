import { useMemo } from 'react'
import { mapeoDeviceStore, Role, useMapeoDeviceStoreAction } from './stores/mapeoDeviceStore'

export const useMapeoDevice = (deviceId: string) => {
  const device = mapeoDeviceStore(
    (store) => store.devices[deviceId],
    (oldVal, newVal) => JSON.stringify(oldVal) !== JSON.stringify(newVal),
  )

  return useMemo(
    () => ({
      device,
      addToProject: (role: Extract<Role, 'coordinator' | 'participant'>) => {
        useMapeoDeviceStoreAction().addDeviceToProject(deviceId, role)
      },
      changeDeviceRole: (role: Extract<Role, 'coordinator' | 'participant'>) => {
        useMapeoDeviceStoreAction().addDeviceToProject(deviceId, role)
      },
      removeDeviceFromProject: () => {
        useMapeoDeviceStoreAction().removeDeviceFromProject(deviceId)
      },
    }),
    [device],
  )
}
