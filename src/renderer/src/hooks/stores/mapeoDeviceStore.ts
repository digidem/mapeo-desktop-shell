import { create } from 'zustand'

type DeviceType = 'mobile' | 'desktop'

export type Role = 'coordinator' | 'participant' | 'waitingInvite'

type MapeoDevice =
  | {
      name: string
      deviceId: string
      deviceType: DeviceType
      pastDeviceNames?: string[]
      role: Extract<Role, 'waitingInvite'>
    }
  | {
      name: string
      deviceId: string
      deviceType: DeviceType
      pastDeviceNames?: string[]
      role: Extract<Role, 'coordinator' | 'participant'>
      dateAdded: Date
    }

type MapeoDeviceState = {
  devices: Record<string, MapeoDevice>
  actions: {
    addDeviceToProject: (deviceId: string, role: Extract<Role, 'coordinator' | 'participant'>) => void
    removeDeviceFromProject: (deviceId: string) => void
    changeDeviceRole: (deviceId: string, newRole: Extract<Role, 'coordinator' | 'participant'>) => void
  }
}

export const mapeoDeviceStore = create<MapeoDeviceState>()((set) => ({
  devices: createRandomDevices(),
  actions: {
    addDeviceToProject: (deviceId, role) =>
      set((state) => {
        const deviceToBeAdded = state.devices[deviceId]
        if (!deviceToBeAdded) {
          throw new Error(`Device does not exist`)
        }

        if (deviceToBeAdded.role !== 'waitingInvite') {
          throw new Error(`Device is already part of the project`)
        }

        return {
          devices: {
            ...state.devices,
            [deviceId]: {
              ...state.devices[deviceId],
              role,
              dateAdded: new Date(),
            },
          },
        }
      }),
    removeDeviceFromProject: (deviceId) =>
      set((state) => {
        const deviceToBeRemoved = state.devices[deviceId]
        if (!deviceToBeRemoved) {
          throw new Error(`Device does not exist`)
        }

        if (deviceToBeRemoved.role === 'waitingInvite') {
          throw new Error(`Device is not part of the project`)
        }

        const { dateAdded, ...rest } = deviceToBeRemoved

        return {
          devices: {
            ...state.devices,
            [deviceId]: {
              ...rest,
              role: 'waitingInvite',
            },
          },
        }
      }),
    changeDeviceRole: (deviceId, newRole) =>
      set((state) => {
        const deviceToBeChanged = state.devices[deviceId]

        if (!deviceToBeChanged) {
          throw new Error(`Device does not exist`)
        }

        if (deviceToBeChanged.role === 'waitingInvite') {
          throw new Error(`Device is not part of the project`)
        }

        return {
          devices: {
            ...state.devices,
            [deviceId]: {
              ...deviceToBeChanged,
              role: newRole,
            },
          },
        }
      }),
  },
}))

export const useMapeoDeviceStoreAction = () => mapeoDeviceStore((store) => store.actions)

function createRandomDevices() {
  const numberOfDevices = Math.floor(Math.random() * (15 - 4 + 1)) + 4
  let mapeoDevices: Record<string, MapeoDevice> = {}

  for (let i = 1; i <= numberOfDevices; i++) {
    mapeoDevices[i] = {
      name: `Peer ${i}`,
      deviceId: i.toString(),
      deviceType: Math.random() > 0.6 ? 'desktop' : 'mobile',
      role: 'waitingInvite',
    }
  }

  return mapeoDevices
}
