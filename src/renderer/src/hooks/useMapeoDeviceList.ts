import { useMapeoDeviceStore } from './stores/mapeoDeviceStore'

export const useMapeoDeviceMembersListIds = () => {
  const devices = useMapeoDeviceStore(
    (store) => store.memberDevices,
    (oldVal, newVal) => {
      const oldValArray = Object.keys(oldVal).map((key) => key)
      const newValArray = Object.keys(newVal).map((key) => key)
      return JSON.stringify(oldValArray) !== JSON.stringify(newValArray)
    },
  )

  return Object.keys(devices).map(([key]) => key)
}

export const useMapeoDeviceNonMembersListIds = () => {
  const devices = useMapeoDeviceStore(
    (store) => store.nonMemberDevices,
    (oldVal, newVal) => {
      const oldValArray = Object.keys(oldVal).map((key) => key)
      const newValArray = Object.keys(newVal).map((key) => key)
      return JSON.stringify(oldValArray) !== JSON.stringify(newValArray)
    },
  )

  return Object.keys(devices).map(([key]) => key)
}
