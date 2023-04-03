/* eslint-disable no-nested-ternary */
import { ButtonProps, CircularProgress, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { StyledButton } from './styles'

type IconType = OverridableComponent<SvgIconTypeMap> | null

type ButtonPropTypesHelper = ButtonProps & {
  children: React.ReactNode
  icon?: IconType
  loading?: boolean
  disabled?: boolean
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
  loading,
  disabled,
  icon = null,
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
    endIcon={<ButtonIcon loading={loading} icon={icon} />}
    onSubmit={onSubmit}
    disabled={disabled || loading}
    disableElevation
    {...rest}
  >
    {children}
  </StyledButton>
)

const ButtonIcon = ({ loading, icon: Icon }: { loading?: boolean; icon: IconType }) => {
  if (loading) return <CircularProgress sx={{ color: 'white' }} size="1em" />

  return Icon ? <Icon /> : null
}
