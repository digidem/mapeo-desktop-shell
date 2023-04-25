import { useMapeoDeviceStore } from './stores/mapeoDeviceStore'

export const useMapeoDeviceMembers = () => {
  const members = useMapeoDeviceStore((store) => store.memberDevices)
  return members
}
