import { styled, Button } from '@mui/material'

export const StyledButton = styled(Button)`
  &.Mui-disabled:not(.MuiButton-text) {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    opacity: 0.7;
  }
`
