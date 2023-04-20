import { useMapeoDeviceStore } from './stores/mapeoDeviceStore'

export const useMapeoDeviceMembersListIds = () => {
  const deviceIds = useMapeoDeviceStore(
    (store) => Object.keys(store.memberDevices),
    (oldVal, newVal) => JSON.stringify(oldVal) !== JSON.stringify(newVal),
  )

  return deviceIds
}

export const useMapeoDeviceNonMembersListIds = () => {
  const deviceIds = useMapeoDeviceStore(
    (store) => Object.keys(store.nonMemberDevices),
    (oldVal, newVal) => JSON.stringify(oldVal) !== JSON.stringify(newVal),
  )

  return deviceIds
}
