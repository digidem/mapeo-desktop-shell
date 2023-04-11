import * as React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import styled from '@emotion/styled'
import LanguageIcon from '@mui/icons-material/Language'
import ProjectIcon from '@mui/icons-material/Assignment'
import AboutIcon from '@mui/icons-material/InfoOutlined'
import CoordinatesIcon from '@mui/icons-material/Explore'

import { Tabs } from '@renderer/components/Tabs'
import { OFF_WHITE, OFF_BLACK, DARK_GREY, GREY } from '@renderer/theme'

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

const SETTINGS_PANEL_NAMES = {
  language: 'language',
  project: 'project',
  about: 'about',
  coordinates: 'coordinates',
} as const

type SettingsTabName = (typeof SETTINGS_PANEL_NAMES)[keyof typeof SETTINGS_PANEL_NAMES]

const Container = styled.div(`
  display: flex;
  flex: 1;
  position: relative;
`)

const SettingsTabContainer = styled.div(`
  border-width: 0 1px 0 0;
  border-color: ${GREY};
  border-style: solid;
`)

export const Settings = () => {
  const [activeTab, setActiveTab] = React.useState<SettingsTabName>('language')

  const { formatMessage: t } = useIntl()

  const tabsData = [
    {
      icon: <LanguageIcon />,
      title: t(m.languageTitle),
      subtitle: t(m.languageSubtitle),
      value: SETTINGS_PANEL_NAMES.language,
    },
    {
      icon: <ProjectIcon />,
      title: t(m.projectTitle),
      subtitle: t(m.projectSubtitle),
      value: SETTINGS_PANEL_NAMES.project,
    },
    {
      icon: <AboutIcon />,
      title: t(m.aboutTitle),
      subtitle: t(m.aboutSubtitle),

      value: SETTINGS_PANEL_NAMES.about,
    },
    {
      icon: <CoordinatesIcon />,
      title: t(m.coordinatesTitle),
      subtitle: t(m.coordinatesSubtitle),
      value: SETTINGS_PANEL_NAMES.coordinates,
    },
  ]

  return (
    <Container>
      <SettingsTabContainer>
        <Tabs<SettingsTabName>
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          selectedColor={OFF_WHITE}
          titleColor={OFF_BLACK}
          subtitleColor={DARK_GREY}
          data={tabsData}
        />
      </SettingsTabContainer>
      <div></div>
    </Container>
  )
}
