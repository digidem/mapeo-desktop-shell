import { Box, CircularProgress } from '@mui/material'
import { Logo } from '../../components/Logo'
import { Column } from '../../components/LayoutComponents'
import { theme } from '@renderer/theme'

export const SplashView = () => {
  return (
    <Box
      display={'flex'}
      justifyContent="center"
      alignItems="flex-start"
      sx={{ height: '100vh', width: '100vw', bgcolor: theme.primary }}
    >
      <Column alignItems="center" spacing={6} sx={{ paddingTop: '33vh', overflow: 'hidden' }}>
        <Logo></Logo>
        <CircularProgress sx={{ color: 'white' }} />
      </Column>
    </Box>
  )
}
