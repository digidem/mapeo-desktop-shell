import styled from '@emotion/styled'
import Tabs, { TabsProps } from '@mui/material/Tabs'
import Tab, { TabProps } from '@mui/material/Tab'
import MapIcon from '@mui/icons-material/Map'
import ObservationsIcon from '@mui/icons-material/PhotoLibrary'
import SyncIcon from '@mui/icons-material/OfflineBolt'
import SettingsIcon from '@mui/icons-material/Settings'
import { defineMessages, useIntl } from 'react-intl'

import { theme } from '@renderer/theme'
import mapeoLogoUrl from '../../../assets/mapeo-sidebar-logo.svg'

import { PANEL_NAMES, PanelName } from '.'

const TypedTabs = (props: Omit<TabsProps, 'value'> & { value: PanelName }) => <Tabs {...props} />
const TypedTab = (props: Omit<TabProps, 'value'> & { value: PanelName }) => <Tab {...props} />

const m = defineMessages({
  territory: {
    id: 'views.Home.Sidebar.territory',
    defaultMessage: 'Territory',
  },
  observations: {
    id: 'views.Home.Sidebar.observations',
    defaultMessage: 'Observations',
  },
  sync: {
    id: 'views.Home.Sidebar.sync',
    defaultMessage: 'Sync',
  },
  settings: {
    id: 'views.Home.Sidebar.settings',
    defaultMessage: 'Settings',
  },
})

const Container = styled.div(`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${theme.blue.main};
  color: ${theme.white};
`)

const LogoContainer = styled.div(`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`)

const StyledTabs = styled(TypedTabs)`
  flex: 1;
  position: relative;
  & .MuiTabs-indicator {
    background-color: ${theme.blueDark};
  }

  color: white;
`

const StyledTab = styled(TypedTab)`
  &.MuiTab-root {
    text-transform: capitalize;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 20px;
    font-size: 1rem;
    opacity: unset;
  }

  &.Mui-selected {
    background-color: ${theme.blueDark}33;
  }
`

interface Props {
  activeTab: PanelName
  onChangeTab: (value: PanelName) => void
}

export const Sidebar = ({ activeTab, onChangeTab }: Props) => {
  const { formatMessage: t } = useIntl()

  return (
    <Container>
      <LogoContainer>
        <img src={mapeoLogoUrl} />
      </LogoContainer>
      <StyledTabs
        orientation="vertical"
        textColor="inherit"
        variant="scrollable"
        value={activeTab}
        onChange={(_, value) => onChangeTab(value)}
      >
        <StyledTab
          icon={<MapIcon />}
          label={t(m.territory)}
          iconPosition="start"
          value={PANEL_NAMES.territory}
        />
        <StyledTab
          label={t(m.observations)}
          icon={<ObservationsIcon />}
          iconPosition="start"
          value={PANEL_NAMES.observations}
        />
        <StyledTab label={t(m.sync)} icon={<SyncIcon />} iconPosition="start" value={PANEL_NAMES.sync} />
        <StyledTab
          label={t(m.settings)}
          icon={<SettingsIcon />}
          iconPosition="start"
          value={PANEL_NAMES.settings}
          sx={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}
        />
      </StyledTabs>
    </Container>
  )
}
