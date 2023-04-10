import styled from '@emotion/styled'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import MapIcon from '@mui/icons-material/Map'
import ObservationsIcon from '@mui/icons-material/PhotoLibrary'
import SyncIcon from '@mui/icons-material/OfflineBolt'
import SettingsIcon from '@mui/icons-material/Settings'

import { Logo } from '@renderer/views/SplashScreen/logo'
import { theme } from '@renderer/theme'

import { PANEL_NAMES, PanelName } from '.'

const Container = styled.div(`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${theme.midnightBlue};
  color: ${theme.white};
`)

const LogoContainer = styled.div(`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`)

const StyledTabs = styled(Tabs)`
  flex: 1;
  position: relative;
  & .MuiTabs-indicator {
    background-color: ${theme.orange};
  }
`

const StyledTab = styled(Tab)`
  &.MuiTab-root {
    text-transform: capitalize;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 20px;
    font-size: 1rem;
    font-weight: bold;
  }

  &.Mui-selected {
    background-color: #33335c;
  }
`

interface Props {
  activeTab: PanelName
  onChangeTab: (value: PanelName) => void
}

export const Sidebar = ({ activeTab, onChangeTab }: Props) => {
  return (
    <Container>
      <LogoContainer>
        <Logo width={160} />
      </LogoContainer>
      <StyledTabs
        orientation="vertical"
        textColor="inherit"
        variant="scrollable"
        value={activeTab}
        onChange={(_, value) => onChangeTab(value)}
      >
        <StyledTab icon={<MapIcon />} label="Territory" iconPosition="start" value={PANEL_NAMES.territory} />
        <StyledTab
          label="Observations"
          icon={<ObservationsIcon />}
          iconPosition="start"
          value={PANEL_NAMES.observations}
        />
        <StyledTab label="Sync" icon={<SyncIcon />} iconPosition="start" value={PANEL_NAMES.sync} />
        <StyledTab
          label="Settings"
          icon={<SettingsIcon />}
          iconPosition="start"
          value={PANEL_NAMES.settings}
          sx={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}
        />
      </StyledTabs>
    </Container>
  )
}
