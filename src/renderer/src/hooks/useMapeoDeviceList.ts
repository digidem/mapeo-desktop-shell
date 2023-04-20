import { useMapeoDeviceStore } from './stores/mapeoDeviceStore'

export const useMapeoDeviceMembersListIds = () => {
  const deviceIds = useMapeoDeviceStore(
    (store) => Object.keys(store.memberDevices).map((key) => key),
    (oldVal, newVal) => JSON.stringify(oldVal) !== JSON.stringify(newVal),
  )

  return deviceIds
}

export const useMapeoDeviceNonMembersListIds = () => {
  const deviceIds = useMapeoDeviceStore(
    (store) => Object.keys(store.nonMemberDevices).map((key) => key),
    (oldVal, newVal) => JSON.stringify(oldVal) !== JSON.stringify(newVal),
  )

  return deviceIds
}
