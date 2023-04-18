import { PropsWithChildren } from 'react'

import styled from '@emotion/styled'

const Container = styled.div<{ hide: boolean }>(
  ({ hide }) => `
  display: flex;
  flex-direction: column;
  flex: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  visibility: ${hide ? 'hidden' : 'visible'};
`,
)

interface Props extends PropsWithChildren<{}> {
  active: boolean
}

export const TabPanel = ({ active, children }: Props) => {
  return <Container hide={!active}>{children}</Container>
}
