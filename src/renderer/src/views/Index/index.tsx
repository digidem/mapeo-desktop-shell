import { useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { DefaultLayout } from '@renderer/layouts/default'

export const IndexView = () => {
  const theme = useTheme()

  return (
    <DefaultLayout sx={{ backgroundColor: theme.blue.mid, padding: 8 }} themeVarient="dark">
      <Link to="/init-migration">Test migration</Link>
    </DefaultLayout>
  )
}
