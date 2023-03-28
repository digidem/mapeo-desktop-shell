import { FormControl, MenuItem, Select, Stack } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useContext, useState } from 'react'
import { IntlSwitchConext } from '../../components/IntlProvider'
import languagesConfig from './languages.json'
import { Row } from '../LayoutComponents'

export const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useContext(IntlSwitchConext)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <FormControl sx={{ m: 1, minWidth: 120, cursor: 'pointer' }} size="small" variant="standard">
      <Row>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={lang}
          IconComponent={() => null}
          sx={{
            '& .MuiInput-input.MuiSelect-select': {
              paddingRight: 1,
            },
            ':after': {
              borderBottom: 'none',
            },
            ':before': {
              borderBottom: 'none',
            },
            ':hover&:before': {
              borderBottom: 'none',
            },
          }}
          renderValue={() => (
            <>
              <Row>
                <ExpandMoreIcon /> {lang.toUpperCase()}
              </Row>
            </>
          )}
        >
          <MenuItem value="en" onClick={() => setLang('en')}>
            {languagesConfig['en']?.nativeName}
          </MenuItem>
          <MenuItem value="es" onClick={() => setLang('es')}>
            {languagesConfig['es']?.nativeName}
          </MenuItem>
        </Select>
      </Row>
    </FormControl>
  )
}
