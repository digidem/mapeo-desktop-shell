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

import TerritoryView from '@assets/TerritoryView.png'
import ObservationView from '@assets/ObservationView.png'
import SyncView from '@assets/SyncView.png'

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
  inviteFlow?: boolean
  showSnackBar?: boolean
}

export const Home = () => {
  const location = useLocation()
  const state = location.state as LocationState
  const initiateInviteFlow = !state || !state.inviteFlow ? false : state.inviteFlow
  const [activePanel, setPanelName] = React.useState<PanelName>(
    !initiateInviteFlow ? 'observations' : 'settings',
  )
  const intl = useIntl()
  const [snackbarMessageOpen, setSnackbarMessageOpen] = React.useState(
    !state || !state.showSnackBar ? false : state.showSnackBar,
  )
  const projectName = useMapeoDeviceStore((store) => store.projectName)

  return (
    <>
      <Box minHeight="100vh" display="flex" flex={1}>
        <GridContainer>
          <SidebarGridSection>
            <Sidebar activeTab={activePanel} onChangeTab={setPanelName} />
          </SidebarGridSection>
          <MainGridSection>
            <TabPanel active={activePanel === 'territory'}>
              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={TerritoryView} />
            </TabPanel>
            <TabPanel active={activePanel === 'observations'}>
              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={ObservationView} />
            </TabPanel>
            <TabPanel active={activePanel === 'sync'}>
              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={SyncView} />
            </TabPanel>
            <TabPanel active={activePanel === 'settings'}>
              <Settings initiateInviteFlow={initiateInviteFlow} />
            </TabPanel>
          </MainGridSection>

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
