import { PeerList } from '@renderer/lib/Particpants'
import { create } from 'zustand'

export type DeviceType = 'mobile' | 'desktop'

export type Role = 'coordinator' | 'participant'

export type Device = {
  name: string
  deviceId: string
  deviceType: DeviceType
  pastDeviceNames?: string[]
  isSelf?: true
}

export type MemberDevice = {
  role: Role
  dateAdded: number
} & Device

type MapeoDeviceState = {
  nonMemberDevices: Record<Device['deviceId'], Device>
  memberDevices: Record<MemberDevice['deviceId'], MemberDevice>
  projectName: string
  actions: {
    addDeviceToProject: (deviceId: string, role: Role) => void
    removeDeviceFromProject: (deviceId: string) => void
    changeDeviceRole: (deviceId: string, newRole: Role) => void
    setProjectName: (name: string) => void
  }
}

export const useMapeoDeviceStore = create<MapeoDeviceState>()((set) => {
  const { members, nonMembers } = PeerList
  return {
    nonMemberDevices: nonMembers,
    memberDevices: members,
    projectName: 'Catapult',
    actions: {
      addDeviceToProject: (deviceId, role) =>
        set((state) => {
          if (state.memberDevices[deviceId]) {
            throw new Error(`Device is already part of the project`)
          }

          const { [deviceId]: deviceToBeAdded, ...newNonMemberDevices } = state.nonMemberDevices

          if (!deviceToBeAdded) {
            throw new Error(`Device does not exist`)
          }

          return {
            nonMemberDevices: newNonMemberDevices,
            memberDevices: {
              ...state.memberDevices,
              [deviceId]: {
                ...deviceToBeAdded,
                role,
                dateAdded: Date.now(),
              },
            },
          }
        }),
      removeDeviceFromProject: (deviceId) =>
        set((state) => {
          const { [deviceId]: deviceToBeRemoved, ...newMemberDevices } = state.memberDevices

          if (!deviceToBeRemoved) {
            throw new Error(`Device is not part of the project`)
          }

          const { dateAdded, role, ...nonMemberDevice } = deviceToBeRemoved

          return {
            memberDevices: newMemberDevices,
            nonMemberDevices: { ...state.nonMemberDevices, [deviceId]: nonMemberDevice },
          }
        }),
      changeDeviceRole: (deviceId, newRole) =>
        set((state) => {
          const deviceToBeChanged = state.memberDevices[deviceId]

          if (!deviceToBeChanged) {
            throw new Error(`Device is not part of the project`)
          }

          return {
            memberDevices: { ...state.memberDevices, [deviceId]: { ...deviceToBeChanged, role: newRole } },
          }
        }),
      setProjectName: (name) => set(() => ({ projectName: name })),
    },
  }
})

export const useMapeoDeviceStoreAction = () => useMapeoDeviceStore((store) => store.actions)
