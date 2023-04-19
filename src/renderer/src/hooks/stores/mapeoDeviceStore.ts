import { create } from 'zustand'

type DeviceType = 'mobile' | 'desktop'

export type Role = 'coordinator' | 'participant'

type Device = {
  name: string
  deviceId: string
  deviceType: DeviceType
  pastDeviceNames?: string[]
}

type MemberDevice = {
  role: Role
  dateAdded: Date
} & Device

type MapeoDeviceState = {
  nonMemberDevices: Record<Device['deviceId'], Device>
  memberDevices: Record<MemberDevice['deviceId'], MemberDevice>
  actions: {
    addDeviceToProject: (deviceId: string, role: Role) => void
    removeDeviceFromProject: (deviceId: string) => void
    changeDeviceRole: (deviceId: string, newRole: Role) => void
  }
}

export const useMapeoDeviceStore = create<MapeoDeviceState>()((set) => ({
  nonMemberDevices: createRandomDevices(),
  memberDevices: {},
  actions: {
    addDeviceToProject: (deviceId, role) =>
      set((state) => {
        if (state.memberDevices[deviceId]) {
          throw new Error(`Device is already part of the project`)
        }

        const deviceToBeAdded = state.nonMemberDevices[deviceId]

        if (!deviceToBeAdded) {
          throw new Error(`Device does not exist`)
        }

        const { [deviceId]: key, ...rest } = state.nonMemberDevices

        return {
          nonMemberDevices: rest,
          memberDevices: {
            ...state.memberDevices,
            [deviceId]: {
              ...deviceToBeAdded,
              role,
              dateAdded: new Date(),
            },
          },
        }
      }),
    removeDeviceFromProject: (deviceId) =>
      set((state) => {
        const deviceToBeRemoved = state.memberDevices[deviceId]
        if (!deviceToBeRemoved) {
          throw new Error(`Device is not part of the project`)
        }
        const { [deviceId]: key, ...newMemberDevices } = state.memberDevices
        const { dateAdded, role, ...rest } = deviceToBeRemoved

        return {
          memberDevices: newMemberDevices,
          nonMemberDevices: { ...state.nonMemberDevices, [deviceId]: rest },
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
  },
}))

export const useMapeoDeviceStoreAction = () => useMapeoDeviceStore((store) => store.actions)

function createRandomDevices() {
  const numberOfDevices = Math.floor(Math.random() * (15 - 4 + 1)) + 4
  let mapeoDevices: Record<string, Device> = {}

  for (let i = 1; i <= numberOfDevices; i++) {
    mapeoDevices[i] = {
      name: `Peer ${i}`,
      deviceId: i.toString(),
      deviceType: Math.random() > 0.6 ? 'desktop' : 'mobile',
    }
  }

  return mapeoDevices
}
