import { FormControl, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material'
import { useContext, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { IntlSwitchConext, translatedLocales } from '../../components/IntlProvider'
import languagesConfig from './languages.json'
import { Row } from '../LayoutComponents'
import { StyledSelect } from './styles'
// import { theme } from '@renderer/theme'

export const LanguageSwitcher = ({ themeVarient = 'light' }: { themeVarient: themeVarientType }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useContext(IntlSwitchConext)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <FormControl
      sx={{ m: 1, minWidth: 120, cursor: 'pointer', position: 'fixed', top: 1, right: 4 }}
      size="small"
      variant="standard"
    >
      <Row justifyContent={'flex-end'}>
        <StyledSelect
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={lang}
          sx={{ color: themeVarient === 'dark' ? theme.background : theme.foreground }}
          IconComponent={() => null}
          renderValue={() => (
            <>
              <Row>
                <ExpandMoreIcon />{' '}
                <Typography variant="body1" component="label" fontWeight="bold">
                  {lang.toUpperCase()}
                </Typography>
              </Row>
            </>
          )}
        >
          {translatedLocales.map((locale) => (
            <MenuItem key={locale} value={locale} onClick={() => setLang(locale)}>
              {languagesConfig[locale]?.nativeName}
            </MenuItem>
          ))}
        </StyledSelect>
      </Row>
    </FormControl>
  )
}

export type themeVarientType = 'light' | 'dark' | undefined
