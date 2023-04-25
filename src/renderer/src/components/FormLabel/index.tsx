import { FormLabel as MuiFormLabel, styled } from '@mui/material'

export const FormLabel = styled(MuiFormLabel)`
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};

  .MuiFormLabel-asterisk {
    color: ${({ theme }) => theme.warningRed};
  }
`
