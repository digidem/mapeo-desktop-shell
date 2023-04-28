import { CssBaseline, GlobalStyles } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import { theme, OFF_BLACK, WHITE, WARNING_RED } from '../../theme'
import { IntlProvider } from '../IntlProvider'
import { Router } from '../Router'
import { fontFace } from './fontface'

const GLOBAL_STYLES: React.ComponentProps<typeof GlobalStyles>['styles'] = [
  fontFace,
  {
    body: {
      color: OFF_BLACK,
      backgroundColor: WHITE,
      fontFamily: `Rubik, Roboto, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', sans-serif;`,
    },
  },
  // Converts all SVG elements to grayscale EXCEPT
  // those built into various MUI form control elements reflecting an error state
  `
  svg {
    filter: grayscale(1);
  }
  [class^=MuiFormControl] svg {
    filter: unset;
  }
  [class^=MuiFormControl] .Mui-error svg {
    color: ${WARNING_RED};
  }
  `,
]

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={GLOBAL_STYLES} />
        <IntlProvider>
          <Router />
        </IntlProvider>
      </ThemeProvider>
    </>
  )
}

export default App
