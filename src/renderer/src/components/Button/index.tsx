/* eslint-disable no-nested-ternary */
import { ButtonProps } from '@mui/material'
import { StyledButton } from './styles'

type ButtonPropTypesHelper = ButtonProps & {
  children: React.ReactNode
  fullWidth?: boolean
  variant: ButtonProps['variant']
}

type ButtonPropTypesOnClick = ButtonPropTypesHelper & {
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void
  onClick: (event: React.FormEvent<HTMLButtonElement>) => void // required here
}

type ButtonPropTypesOnSubmit = ButtonPropTypesHelper & {
  onSubmit: (event: React.FormEvent<HTMLButtonElement>) => void // required here
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void
}

type ButtonPropTypes = ButtonPropTypesOnSubmit | ButtonPropTypesOnClick

export const Button = ({
  children,
  onSubmit,
  fullWidth = false,
  color = 'secondary',
  variant = 'contained',
  sx,
  ...rest
}: ButtonPropTypes) => (
  <StyledButton
    data-testid="submit-button"
    type="submit"
    fullWidth={fullWidth}
    size="large"
    variant={variant}
    color={color}
    sx={{
      borderRadius: 2,
      display: 'flex',
      justifyContent: 'space-between',
      textTransform: 'none',
      fontWeight: 600,
      ...sx,
    }}
    onSubmit={onSubmit}
    disableElevation
    {...rest}
  >
    {children}
  </StyledButton>
)
