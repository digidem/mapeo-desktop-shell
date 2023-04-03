import { Routes, HashRouter, Route } from 'react-router-dom'
import { IndexView } from '../../views/Index'
import { MigrationView } from '../../views/Migration'

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<IndexView />} />
      <Route path="/init-migration" element={<MigrationView />} />
    </Routes>
  </HashRouter>
)
