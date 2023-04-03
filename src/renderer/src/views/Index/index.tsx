import { Card, Typography, styled, useTheme } from '@mui/material'
import { defineMessages, useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { DefaultLayout } from '@renderer/layouts/default'
import { Column } from '@renderer/components/LayoutComponents'

export const IndexView = () => {
  const theme = useTheme()

  const inlt = useIntl()

  return (
    <DefaultLayout sx={{ backgroundColor: theme.blue.mid, padding: 8 }} themeVarient="dark">
      <Column justifyContent="flex-start" spacing={4}>
        <span>
          <Typography variant="h1" color={'white'}>
            {inlt.formatMessage(messages.title)}
          </Typography>
          <Typography variant="h2" color={'white'}>
            {inlt.formatMessage(messages.subtitle)}
          </Typography>
        </span>

        <StyledLink to="/init-migration">
          <Card sx={{ padding: 2 }}>{inlt.formatMessage(messages.subtitle)}</Card>
        </StyledLink>
      </Column>
    </DefaultLayout>
  )
}

const messages = defineMessages({
  title: {
    id: 'views.navigation.title',
    defaultMessage: 'Mapeo Desktop Testing',
  },
  subtitle: {
    id: 'views.navigation.subtitle',
    defaultMessage: 'Migration',
  },
  migrationFlow: {
    id: 'views.navigation.migrationFlow',
    defaultMessage: 'Migration flow',
  },
})

const StyledLink = styled(Link)`
  text-decoration: none;
  width: max-content;
`
