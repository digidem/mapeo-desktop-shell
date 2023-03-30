import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      log: () => void
      getLocale: () => Promise<string>
    }
  }
}
