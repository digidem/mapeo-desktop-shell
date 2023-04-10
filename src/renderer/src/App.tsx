import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import styled from '@emotion/styled'
import GlobalStyles from '@mui/material/GlobalStyles'

import { IntlProvider } from '@renderer/components/IntlProvider'
import { IndexView } from '@renderer/views/Index'
import { OFF_BLACK as black, OFF_WHITE as white } from '@renderer/theme'

const router = createMemoryRouter([
  {
    path: '/',
    element: <IndexView />,
  },
])

const AppContainer = styled.div(`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`)

function App(): JSX.Element | null {
  return (
    <IntlProvider>
      <GlobalStyles
        styles={{
          color: black,
          backgroundColor: white,
        }}
      />
      <AppContainer>
        <RouterProvider router={router} />
      </AppContainer>
    </IntlProvider>
  )
}

export default App
