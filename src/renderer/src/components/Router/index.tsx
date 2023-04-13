import { Routes, HashRouter, Route } from 'react-router-dom'
import { IndexView } from '../../views/Index'
import { MigrationView } from '../../views/Migration'
import { MigratingProjectView } from '@renderer/views/MigratingProject'

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<IndexView />} />
      <Route path="/init-migration" element={<MigrationView />} />
      <Route path="/migrating-project" element={<MigratingProjectView />} />
    </Routes>
  </HashRouter>
)
