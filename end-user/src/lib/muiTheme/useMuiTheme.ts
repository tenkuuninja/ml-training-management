import {
  ThemeOptions,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@mui/material/styles'
import { useEffect, useState } from 'react'
import componentsOverrides from './components'

export const muiThemeOption: ThemeOptions = {
  palette: {
    primary: {
      main: '#01B5DC',
      contrastText: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
}

export default function useMuiTheme() {
  const [muiTheme, setMuiTheme] = useState(createMuiTheme(muiThemeOption))

  const handleCreateMuiTheme = () => {
    if (muiThemeOption?.palette) {
      muiThemeOption.palette.mode = 'light'
    }
    const newMuiTheme = createMuiTheme(muiThemeOption)
    if (newMuiTheme.components) {
      newMuiTheme.components = componentsOverrides(newMuiTheme)
    }
    setMuiTheme(newMuiTheme)
  }

  useEffect(() => {
    handleCreateMuiTheme()
  }, [])

  return muiTheme
}
