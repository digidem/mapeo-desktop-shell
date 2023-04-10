import { PropsWithChildren } from 'react'

import styled from '@emotion/styled'

const Container = styled.div(`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`)

interface Props extends PropsWithChildren<{}> {
  active: boolean
}

export const TabPanel = ({ active, children }: Props) => {
  return <Container hidden={!active}>{active ? children : null}</Container>
}
