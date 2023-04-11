import styled from '@emotion/styled'
import { Select, SelectProps } from '@mui/material'

export const StyledSelect = styled(Select)<SelectProps>`
  &.muistack-root {
    justify-content: flex-end;
  }
  .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input {
    padding-right: 10px;
  }
  &:after {
    border-bottom: none;
  }
  &:before {
    border-bottom: none;
  }
  &:hover&:before {
    border-bottom: none;
  }
`
