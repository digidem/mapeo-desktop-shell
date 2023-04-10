import * as React from 'react'

import styled from '@emotion/styled'
import { theme } from '@renderer/theme'

import { Sidebar } from './Sidebar'
import { TabPanel } from './TabPanel'

const Container = styled.div(`
  flex: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
`)

const SidebarGridSection = styled.div(`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex: 1;
`)

const MainGridSection = styled.div(`
  grid-area: 1 / 2 / 2 / 3;
  position: relative;
`)

const BottomBarGridSection = styled.div(`
  grid-area: 2 / 1 / 3 / 3;
  background: ${theme.midnightBlue};
`)

export const PANEL_NAMES = {
  territory: 'territory',
  observations: 'observations',
  sync: 'sync',
  settings: 'settings',
} as const

export type PanelName = (typeof PANEL_NAMES)[keyof typeof PANEL_NAMES]

interface Props {
  showBottomBar?: boolean
}

export const Home = ({ showBottomBar }: Props) => {
  const [activePanel, setPanelName] = React.useState<PanelName>('territory')

  return (
    <Container>
      <SidebarGridSection>
        <Sidebar activeTab={activePanel} onChangeTab={setPanelName} />
      </SidebarGridSection>
      <MainGridSection>
        <TabPanel active={activePanel === 'territory'}>Territory</TabPanel>
        <TabPanel active={activePanel === 'observations'}>Observations</TabPanel>
        <TabPanel active={activePanel === 'sync'}>Sync</TabPanel>
        <TabPanel active={activePanel === 'settings'}>Settings</TabPanel>
      </MainGridSection>
      {showBottomBar && (
        <BottomBarGridSection>
          <div style={{ height: 30 }} />
        </BottomBarGridSection>
      )}
    </Container>
  )
}
