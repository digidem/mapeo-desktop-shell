import { FormControl, MenuItem, Select, Stack } from '@mui/material'
import { useContext, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { IntlSwitchConext, translatedLocales } from '../../components/IntlProvider'
import languagesConfig from './languages.json'
import { Row } from '../LayoutComponents'
import { StyledSelect } from './styles'

export const LanguageSwitcher = () => {
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
          IconComponent={() => null}
          renderValue={() => (
            <>
              <Row>
                <ExpandMoreIcon /> {lang.toUpperCase()}
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
