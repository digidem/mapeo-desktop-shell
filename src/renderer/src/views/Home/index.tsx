import * as React from 'react'

import styled from '@emotion/styled'
import { theme } from '@renderer/theme'
import { Box, Snackbar, Typography } from '@mui/material'

import { Sidebar, sidebarMessages } from './Sidebar'
import { TabPanel } from './TabPanel'
import { Settings } from './Settings'
import { useLocation } from 'react-router-dom'
import { defineMessages, useIntl } from 'react-intl'
import { CheckCircleRounded } from '@mui/icons-material'
import { Row } from '@renderer/components/LayoutComponents'
import shadows from '@mui/material/styles/shadows'
import { useMapeoDeviceStore } from '@renderer/hooks/stores/mapeoDeviceStore'

const GridContainer = styled.div(`
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
  background: ${theme.blueDark};
`)

export type PanelName = 'territory' | 'observations' | 'sync' | 'settings'

type LocationState = {
  defaultTab?: PanelName
  showBottomBar?: boolean
}

export const Home = () => {
  const location = useLocation()
  const state = location.state as LocationState
  const [activePanel, setPanelName] = React.useState<PanelName>(state?.defaultTab || 'territory')
  const intl = useIntl()
  const [snackbarMessageOpen, setSnackbarMessageOpen] = React.useState(!!state.showBottomBar)
  const projectName = useMapeoDeviceStore((store) => store.projectName)

  console.log({ snackbarMessageOpen })

  return (
    <>
      <Box minHeight="100vh" display="flex" flex={1}>
        <GridContainer>
          <SidebarGridSection>
            <Sidebar activeTab={activePanel} onChangeTab={setPanelName} />
          </SidebarGridSection>
          <MainGridSection>
            <TabPanel active={activePanel === 'territory'}>
              {intl.formatMessage(sidebarMessages.territory)}
            </TabPanel>
            <TabPanel active={activePanel === 'observations'}>
              {intl.formatMessage(sidebarMessages.observations)}
            </TabPanel>
            <TabPanel active={activePanel === 'sync'}>{intl.formatMessage(sidebarMessages.sync)}</TabPanel>
            <TabPanel active={activePanel === 'settings'}>
              <Settings />
            </TabPanel>
          </MainGridSection>
          {state.showBottomBar && (
            <BottomBarGridSection>
              <Typography
                variant="body1"
                fontWeight={500}
                color="white"
                align="center"
                sx={{ width: '100%', py: '3px' }}
              >
                {projectName}
              </Typography>
            </BottomBarGridSection>
          )}
        </GridContainer>
      </Box>
      <Snackbar
        open={snackbarMessageOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarMessageOpen(false)}
        sx={{ mb: 3, ml: 26 }}
      >
        <Box sx={{ borderRadius: 1, bgcolor: theme.white, p: 2, boxShadow: shadows[2] }}>
          <Row alignItems="center" spacing={2}>
            <CheckCircleRounded sx={{ height: 50, width: 50 }} color="primary" />
            <Typography variant="body1" component="label" fontWeight={500}>
              {intl.formatMessage(messages.successfullyInstalled)}
            </Typography>
            <Typography variant="body1" component="label" color="primary" fontWeight={700}>
              {intl.formatMessage(messages.learnMore)}
            </Typography>
          </Row>
        </Box>
      </Snackbar>
    </>
  )
}

const messages = defineMessages({
  successfullyInstalled: {
    id: 'views.home.tabs.successfullyInstalled',
    defaultMessage: 'Mapeo SuperS was successfully installed',
  },
  learnMore: {
    id: 'views.home.tabs.learnMore',
    defaultMessage: 'Learn more',
  },
})
