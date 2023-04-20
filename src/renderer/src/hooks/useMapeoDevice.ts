import { useMapeoDeviceStore, Role, useMapeoDeviceStoreAction } from './stores/mapeoDeviceStore'

export const useMapeoDevice = (deviceId: string) => {
  const device = useMapeoDeviceStore(
    (store) => store.memberDevices[deviceId] || store.nonMemberDevices[deviceId],
  )

  return {
    device,
    addToProject: (role: Role) => {
      useMapeoDeviceStoreAction().addDeviceToProject(deviceId, role)
    },
    changeDeviceRole: (role: Role) => {
      useMapeoDeviceStoreAction().addDeviceToProject(deviceId, role)
    },
    removeDeviceFromProject: () => {
      useMapeoDeviceStoreAction().removeDeviceFromProject(deviceId)
    },
  }
}
