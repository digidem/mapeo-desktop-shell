import { Device, MemberDevice } from '@renderer/hooks/stores/mapeoDeviceStore'

function createTimestamp() {
  return randomTimestamp(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date())
}

function randomTimestamp(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime()
}

export const PeerList: {
  members: Record<string, MemberDevice>
  nonMembers: Record<string, Device>
} = {
  members: {
    1: {
      name: 'HP 113-17',
      deviceId: '1',
      deviceType: 'desktop',
      dateAdded: createTimestamp(),
      role: 'coordinator',
      isSelf: true,
    },
    2: {
      name: 'Mar',
      deviceId: '2',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
      dateAdded: createTimestamp(),
      role: Math.random() > 0.8 ? 'coordinator' : 'participant',
      pastDeviceNames: ['Mar1', 'Maria'],
    },
    3: {
      name: 'Nala',
      deviceId: '3',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
      dateAdded: createTimestamp(),
      role: Math.random() > 0.8 ? 'coordinator' : 'participant',
    },
    4: {
      name: 'Mario',
      deviceId: '4',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
      dateAdded: createTimestamp(),
      role: Math.random() > 0.8 ? 'coordinator' : 'participant',
    },
    5: {
      name: 'Frida',
      deviceId: '5',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
      dateAdded: createTimestamp(),
      role: Math.random() > 0.8 ? 'coordinator' : 'participant',
    },
    6: {
      name: 'Andi',
      deviceId: '6',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
      dateAdded: createTimestamp(),
      role: Math.random() > 0.8 ? 'coordinator' : 'participant',
      pastDeviceNames: ['Andrea', 'Andy', "Andi's Android"],
    },
    7: {
      name: 'Erik',
      deviceId: '7',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
      dateAdded: createTimestamp(),
      role: Math.random() > 0.8 ? 'coordinator' : 'participant',
    },
    8: {
      name: 'Margo',
      deviceId: '8',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
      dateAdded: createTimestamp(),
      role: Math.random() > 0.8 ? 'coordinator' : 'participant',
      pastDeviceNames: ['Margot', 'MargoAndroid'],
    },
  },
  nonMembers: {
    9: {
      name: 'Maria',
      deviceId: '9',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
    },
    10: {
      name: 'Mel',
      deviceId: '10',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
    },
    11: {
      name: 'Gustav',
      deviceId: '11',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
    },
    12: {
      name: 'Andrew',
      deviceId: '12',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
    },
    13: {
      name: 'Tom',
      deviceId: '13',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
      pastDeviceNames: ['Tomas', 'Tom1', "Tom's Android"],
    },
    14: {
      name: 'Ed',
      deviceId: '14',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
      pastDeviceNames: ['edward'],
    },
    15: {
      name: 'Manuel',
      deviceId: '15',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
    },
    16: {
      name: 'Millie',
      deviceId: '16',
      deviceType: Math.random() > 0.5 ? 'desktop' : 'mobile',
    },
  },
}
