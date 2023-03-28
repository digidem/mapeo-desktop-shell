import { FormControl, MenuItem, Select, Stack } from '@mui/material'
import { useContext, useState } from 'react'
import { IntlSwitchConext } from '../../components/IntlProvider'
import languagesConfig from './languages.json'

export const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useContext(IntlSwitchConext)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <FormControl sx={{ m: 1, minWidth: 120, cursor: 'pointer' }} size="small" variant="standard">
      <Stack direction="row">
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={lang}
          IconComponent={() => null}
          renderValue={() => lang.toUpperCase()}
        >
          <MenuItem value="en" onClick={() => setLang('en')}>
            {languagesConfig['en']?.nativeName}
          </MenuItem>
          <MenuItem value="es" onClick={() => setLang('es')}>
            {languagesConfig['es']?.nativeName}
          </MenuItem>
        </Select>
      </Stack>
    </FormControl>
  )
}
