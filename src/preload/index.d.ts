import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      log: () => void
      getLocale: () => Promise<string>
      setLocale: (locale) => Promise<string>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      on: (channel: string, callback: (...args: any[]) => void) => void
    }
  }
}
