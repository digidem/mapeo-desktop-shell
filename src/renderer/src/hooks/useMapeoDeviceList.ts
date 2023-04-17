import { mapeoDeviceStore } from './stores/mapeoDeviceStore'

export const useMapeoDeviceList = () => {
  const devices = mapeoDeviceStore((store) => store.devices)
  return {
    members: Object.values(devices).filter((val) => val.role !== 'waitingInvite'),
    nonMembers: Object.values(devices).filter((val) => val.role === 'waitingInvite'),
  }
}
