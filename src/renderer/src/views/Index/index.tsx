import { ReactNode } from 'react'
import { styled, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import { defineMessages, useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { DefaultLayout } from '@renderer/layouts/default'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { LeaveProjectModal } from '@renderer/components/LeaveProjectModal'

export const IndexView = () => {
  const theme = useTheme()

  const intl = useIntl()

  return (
    <DefaultLayout sx={{ backgroundColor: theme.blue.mid, padding: 8 }} langBackgroundVarient="dark">
      <Typography variant="h1" color={'white'} align="center">
        {intl.formatMessage(messages.title)}
      </Typography>
      <LeaveProjectModal projectName="Catapult" />

      <Row sx={{ mt: 8 }} spacing={15}>
        <TestGroupColumn title={intl.formatMessage(messages.migration)}>
          <CardLink number={1} to="/init-migration" title={intl.formatMessage(messages.dataIsDetected)} />
          <CardLink
            number={2}
            to="/migration-no-data"
            title={intl.formatMessage<ReactNode>(messages.dataNotDetected, {
              bold: (str) => <strong>{str}</strong>,
            })}
          />
        </TestGroupColumn>
        <TestGroupColumn title={intl.formatMessage(messages.invitation)}>
          <CardLink number={3} to="/" title={intl.formatMessage(messages.inviteDevice)} />
        </TestGroupColumn>
      </Row>
    </DefaultLayout>
  )
}

const TestGroupColumn = ({ title, children }: { title: string; children: ReactNode }) => (
  <Column justifyContent="flex-start" spacing={4}>
    <Typography variant="h2" color={'white'}>
      {title}
    </Typography>
    {children}
  </Column>
)

const CardLink = ({ number, title, to }: { number: number; title: string | ReactNode; to: string }) => (
  <StyledLink to={to}>
    <StyledCard>
      <StyledNumBox>
        <Typography variant="h2" fontWeight={500}>
          {number}
        </Typography>
      </StyledNumBox>
      <Row sx={{ p: 4 }} alignItems="center">
        <Typography variant="h5" component="label" sx={{ fontSize: 20 }}>
          {title}
        </Typography>
      </Row>
    </StyledCard>
  </StyledLink>
)

const messages = defineMessages({
  title: {
    id: 'views.navigation.title',
    defaultMessage: 'Mapeo Desktop Testing',
  },
  migration: {
    id: 'views.navigation.migration',
    defaultMessage: 'Migration',
  },
  invitation: {
    id: 'views.navigation.invitation',
    defaultMessage: 'Invitation',
  },
  dataIsDetected: {
    id: 'views.navigation.dataIsDetected',
    defaultMessage: 'Mapeo Data Is Detected',
  },
  dataNotDetected: {
    id: 'views.navigation.dataNotDetected',
    defaultMessage: 'Mapeo Is <bold>Not</bold> Detected',
  },
  inviteDevice: {
    id: 'views.navigation.inviteDevice',
    defaultMessage: 'Invite Device',
  },
})

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  flex: 1 auto;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[12]};
  }
`

const StyledNumBox = styled(Box)`
  background-color: ${({ theme }) => theme.grey.light};
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledLink = styled(Link)`
  /* flex: 1; */
  width: 100%;
  min-width: 400px;
  text-decoration: none;
  width: max-content;

  * {
    cursor: pointer;
  }
`
