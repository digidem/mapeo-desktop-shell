import styled from '@emotion/styled'
import MapIcon from '@mui/icons-material/Map'
import ObservationsIcon from '@mui/icons-material/PhotoLibrary'
import SyncIcon from '@mui/icons-material/OfflineBolt'
import SettingsIcon from '@mui/icons-material/Settings'
import { defineMessages, useIntl } from 'react-intl'

import { Tabs } from '@renderer/components/Tabs'
import { theme } from '@renderer/theme'
import mapeoLogoUrl from '../../../assets/mapeo-sidebar-logo.svg'

import { PanelName } from '.'

export const sidebarMessages = defineMessages({
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

interface Props {
  activeTab: PanelName
  onChangeTab: (value: PanelName) => void
}

export const Sidebar = ({ activeTab, onChangeTab }: Props) => {
  const { formatMessage: t } = useIntl()

  const tabsData: React.ComponentProps<typeof Tabs<PanelName>>['data'] = [
    {
      icon: <MapIcon />,
      title: t(sidebarMessages.territory),
      value: 'territory',
    },
    {
      icon: <ObservationsIcon />,
      title: t(sidebarMessages.observations),
      value: 'observations',
    },
    {
      icon: <SyncIcon />,
      title: t(sidebarMessages.sync),
      value: 'sync',
    },
    {
      icon: <SettingsIcon />,
      title: t(sidebarMessages.settings),
      value: 'settings',
      sx: { position: 'absolute', bottom: 0, right: 0, left: 0 },
    },
  ]

  return (
    <Container>
      <LogoContainer>
        <img src={mapeoLogoUrl} />
      </LogoContainer>
      <Tabs
        activeTab={activeTab}
        onChangeTab={onChangeTab}
        selectedColor={`${theme.black}33`}
        titleColor={theme.white}
        data={tabsData}
      />
    </Container>
  )
}
