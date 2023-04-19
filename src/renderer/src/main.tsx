import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { CssBaseline, GlobalStyles } from '@mui/material'

import { OFF_BLACK as black, OFF_WHITE as white } from './theme'
import App from './App'

const GLOBAL_STYLES = {
  color: black,
  backgroundColor: white,
  fontFamily: `font-family: Rubik, Roboto, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', sans-serif;`,
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <GlobalStyles styles={GLOBAL_STYLES} />
    <App />
  </React.StrictMode>,
)
