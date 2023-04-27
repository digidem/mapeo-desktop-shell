import { ReactNode } from 'react'
import { Box, SxProps } from '@mui/material'

export const DefaultLayout = ({ children, sx }: { children: ReactNode; sx?: SxProps }) => {
  return (
    <Box minHeight="100vh" display="flex" flex={1} sx={sx}>
      {children}
    </Box>
  )
}
