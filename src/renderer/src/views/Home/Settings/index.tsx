import * as React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import styled from '@emotion/styled'
import { useTheme } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import ProjectIcon from '@mui/icons-material/Assignment'
import AboutIcon from '@mui/icons-material/InfoOutlined'
import CoordinatesIcon from '@mui/icons-material/Explore'
import { spacing } from '@renderer/theme/spacing'
import { Tabs } from '@renderer/components/Tabs'
import { GREY_LIGHT } from '@renderer/theme'

import { TabPanel } from '../TabPanel'
import { ProjectConfig } from './ProjectConfig'

const m = defineMessages({
  languageTitle: {
    id: 'views.Home.Settings.index.languageTitle',
    defaultMessage: 'Language',
  },
  languageSubtitle: {
    id: 'views.Home.Settings.index.languageSubtitle',
    defaultMessage: 'Display language for App',
  },
  projectTitle: {
    id: 'views.Home.Settings.index.projectTitle',
    defaultMessage: 'Project Configuration',
  },
  projectSubtitle: {
    id: 'views.Home.Settings.index.projectSubtitle',
    defaultMessage: 'Categories, icons and questions',
  },
  aboutTitle: {
    id: 'views.Home.Settings.index.aboutTitle',
    defaultMessage: 'About',
  },
  aboutSubtitle: {
    id: 'views.Home.Settings.index.aboutSubtitle',
    defaultMessage: 'Version and build number',
  },
  coordinatesTitle: {
    id: 'views.Home.Settings.index.coordinatesTitle',
    defaultMessage: 'Coordinate System',
  },
  coordinatesSubtitle: {
    id: 'views.Home.Settings.index.coordinatesSubtitle',
    defaultMessage: 'UTM, Lat/Long, DMS',
  },
})

type SettingsTabName = 'language' | 'project' | 'about' | 'coordinates'

const Container = styled.div(`
  display: flex;
  flex: 1;
  position: relative;
`)

const SettingsTabContainer = styled.div(`
  border-width: 0 1px 0 0;
  border-color: ${GREY_LIGHT};
  border-style: solid;
  padding-top: ${spacing.large};
`)

const SettingsPanelContainer = styled.div(`
  position: relative;
  display: flex;
  flex-direction: row;
  flex: 1;
`)

export const Settings = () => {
  const [activeTab, setActiveTab] = React.useState<SettingsTabName>('project')

  const { formatMessage: t } = useIntl()

  const theme = useTheme()

  const tabsData: React.ComponentProps<typeof Tabs<SettingsTabName>>['data'] = [
    {
      icon: <LanguageIcon />,
      title: t(m.languageTitle),
      subtitle: t(m.languageSubtitle),
      value: 'language',
    },
    {
      icon: <ProjectIcon />,
      title: t(m.projectTitle),
      subtitle: t(m.projectSubtitle),
      value: 'project',
    },
    {
      icon: <AboutIcon />,
      title: t(m.aboutTitle),
      subtitle: t(m.aboutSubtitle),
      value: 'about',
    },
    {
      icon: <CoordinatesIcon />,
      title: t(m.coordinatesTitle),
      subtitle: t(m.coordinatesSubtitle),
      value: 'coordinates',
    },
  ]

  return (
    <Container>
      <SettingsTabContainer>
        <Tabs<SettingsTabName>
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          selectedColor={theme.background}
          titleColor={theme.black}
          subtitleColor={theme.grey.main}
          data={tabsData}
        />
      </SettingsTabContainer>
      <SettingsPanelContainer>
        <TabPanel active={activeTab === 'language'}>Language</TabPanel>
        <TabPanel active={activeTab === 'project'}>
          <ProjectConfig />
        </TabPanel>
        <TabPanel active={activeTab === 'about'}>About</TabPanel>
        <TabPanel active={activeTab === 'coordinates'}>Coordinate System</TabPanel>
      </SettingsPanelContainer>
    </Container>
  )
}
