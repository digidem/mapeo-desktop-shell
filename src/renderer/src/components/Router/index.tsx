import { Routes, HashRouter, Route } from 'react-router-dom'
import { IndexView } from '../../views/Index'
import { MigrationView } from '../../views/Migration'
import { MigratingProjectView } from '@renderer/views/MigratingProject'
import { Home } from '@renderer/views/Home'
import { MigrationNoDataView } from '@renderer/views/MigrationNoData'

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<IndexView />} />
      <Route path="/init-migration" element={<MigrationView />} />
      <Route path="/migrating-project" element={<MigratingProjectView />} />
      <Route path="/home" element={<Home />} />
      <Route path="/migration-no-data" element={<MigrationNoDataView />}></Route>
    </Routes>
  </HashRouter>
)
