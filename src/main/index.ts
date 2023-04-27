import { app, shell, BrowserWindow, ipcMain, Menu, MenuItemConstructorOptions } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { createIntl, createIntlCache, defineMessages } from 'react-intl'
import translations from '../renderer/translations/messages.json'

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache()

let locale = app.getLocale() || 'es'

let mainWindow

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 400,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const menu = Menu.buildFromTemplate(getMenuTemplate())
  Menu.setApplicationMenu(menu)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('get-locale', () => {
  const lang = app.getLocale()

  return lang
})

ipcMain.handle('set-locale', (event, lang) => {
  locale = lang

  const menu = Menu.buildFromTemplate(getMenuTemplate())
  Menu.setApplicationMenu(menu)
})

const messages = defineMessages({
  file: {
    id: 'app.menu.file',
    defaultMessage: 'File',
  },
  testingHome: {
    id: 'app.menu.testingHome',
    defaultMessage: 'Testing Home',
  },
  mapeoDataIsDetected: {
    id: 'app.menu.mapeoDataIsDetected',
    defaultMessage: 'Mapeo Data Is Detected',
  },
  mapeoDataNotDetected: {
    id: 'app.menu.mapeoDataNotDetected',
    defaultMessage: 'Mapeo Data Is Not Detected',
  },
  inviteDevice: {
    id: 'app.menu.inviteDevice',
    defaultMessage: 'Invite Device',
  },
  edit: {
    id: 'app.menu.edit',
    defaultMessage: 'Edit',
  },
  copy: {
    id: 'app.menu.copy',
    defaultMessage: 'Copy',
  },
  cut: {
    id: 'app.menu.cut',
    defaultMessage: 'Cut',
  },
  paste: {
    id: 'app.menu.paste',
    defaultMessage: 'Paste',
  },
})

const getMenuTemplate = () => {
  const intl = createIntl(
    {
      locale,
      messages: translations[locale],
    },
    cache,
  )

  return [
    {
      label: intl.formatMessage(messages.file),
      submenu: [
        {
          label: intl.formatMessage(messages.testingHome),
          click() {
            navigate('/')
          },
        },
        { type: 'separator' },
        {
          label: intl.formatMessage(messages.mapeoDataIsDetected),
          click() {
            navigate('/init-migration')
          },
        },
        {
          label: intl.formatMessage(messages.mapeoDataNotDetected),
          click() {
            navigate('/migration-no-data')
          },
        },
        {
          label: intl.formatMessage(messages.inviteDevice),
          click() {
            navigate('/home', { defaultTab: 'settings' })
          },
        },
      ],
    },
    {
      label: intl.formatMessage(messages.edit),
      submenu: [
        {
          label: intl.formatMessage(messages.cut),
          accelerator: 'CmdOrCtrl+X',
          role: 'cut',
        },
        {
          label: intl.formatMessage(messages.copy),
          accelerator: 'CmdOrCtrl+C',
          role: 'copy',
        },
        {
          label: intl.formatMessage(messages.paste),
          accelerator: 'CmdOrCtrl+V',
          role: 'paste',
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
  ] as MenuItemConstructorOptions[]
}

const navigate = (to: string, state?: object) => {
  mainWindow.webContents.send('navigate', { to, state })
}
