import { mapeoDeviceStore } from './stores/mapeoDeviceStore'
/**
 * This should only be used to display a list. When dealing with a singular device, use `useMapeDevice` as that is memoized. This component will update all its children when any component in the list is updated.
 *
 */
export const useMapeoDeviceList = () => {
  const devices = mapeoDeviceStore((store) => store.devices)
  return {
    members: Object.values(devices).filter((val) => val.role !== 'waitingInvite'),
    nonMembers: Object.values(devices).filter((val) => val.role === 'waitingInvite'),
  } as const
}
