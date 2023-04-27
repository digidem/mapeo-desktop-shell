import { create } from 'zustand'

type DeviceType = 'mobile' | 'desktop'

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
  const { members, nonMembers } = createRandomDevices(6, 15)
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

function createRandomDevices(min: number, max: number) {
  const numberOfDevices = randomInteger(min, max)

  const nonMembers: Record<string, Device> = {}
  const members: Record<string, MemberDevice> = {}

  for (let i = 1; i <= numberOfDevices; i++) {
    // Always create at least one member and one non-member device
    const isMember = i === 1 ? true : i === 2 ? false : Math.random() > 0.6

    const deviceType = Math.random() > 0.75 ? 'desktop' : 'mobile'

    const deviceInfo: Device = {
      name: `Peer ${i}`,
      deviceType,
      deviceId: deviceType === 'mobile' ? `Android ${i}` : `Desktop ${i}`,
    }

    if (i === 1) {
      deviceInfo.isSelf = true
    }

    if (isMember) {
      const memberDeviceInfo: MemberDevice = {
        ...deviceInfo,
        role: deviceInfo.isSelf || Math.random() > 0.8 ? 'coordinator' : 'participant',
        dateAdded: Date.now(),
      }

      members[memberDeviceInfo.deviceId] = memberDeviceInfo
    } else {
      nonMembers[deviceInfo.deviceId] = deviceInfo
    }
  }

  return { members, nonMembers }
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
