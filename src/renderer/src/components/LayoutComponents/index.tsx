import { Stack, StackProps as MuiStackProps } from '@mui/material'

type StackProps = MuiStackProps & {
  component?: keyof HTMLElementTagNameMap
}

export const Row = (props: StackProps) => <Stack direction="row" {...props} />
export const Column = (props: StackProps) => <Stack direction="column" {...props} />
