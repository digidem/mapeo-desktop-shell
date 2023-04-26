import { Routes, HashRouter, Route, useNavigate } from 'react-router-dom'
import { IndexView } from '../../views/Index'
import { MigrationView } from '../../views/Migration'
import { MigrationNoDataView } from '../../views/MigrationNoData'
import { MigratingProjectView } from '@renderer/views/MigratingProject'
import { MigrationCompleteView } from '@renderer/views/MigrationComplete'
import { Home } from '@renderer/views/Home'
import { useEffect } from 'react'

export const Router = () => {
  return (
    <HashRouter>
      <MenuNavigationProvider />
      <Routes>
        <Route path="/" element={<IndexView />} />
        <Route path="/migration-no-data" element={<MigrationNoDataView />} />
        <Route path="/init-migration" element={<MigrationView />} />
        <Route path="/migrating-project" element={<MigratingProjectView />} />
        <Route path="/migration-complete" element={<MigrationCompleteView />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}

// Bit of an anti-pattern but its the best of a few possibilities...
// Problem here is that react-router doesn't allow useNavigate to be
// called outside a Router component.

const MenuNavigationProvider = () => {
  const navigate = useNavigate()
  useEffect(() => {
    window.electron.ipcRenderer.on('navigate', (args, to) => {
      navigate(to)
    })
  }, [])

  return null
}
