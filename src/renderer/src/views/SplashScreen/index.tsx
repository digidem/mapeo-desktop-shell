import { Box, CircularProgress } from '@mui/material'
import { theme } from '../../theme'
import { Logo } from './logo'
import { Column } from '../../components/LayoutComponents'

export const SplashView = () => {
  return (
    <Box
      display={'flex'}
      justifyContent="center"
      alignItems="flex-start"
      sx={{ height: '100vh', width: '100vw', bgcolor: theme.blue }}
    >
      <Column alignItems="center" spacing={6} sx={{ paddingTop: '33vh', overflow: 'hidden' }}>
        <Logo></Logo>
        <CircularProgress sx={{ color: 'white' }} />
      </Column>
    </Box>
  )
}
