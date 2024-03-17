import { Components, Theme } from '@mui/material'

export default function MuiAutoCompleteTheme(theme: Theme): Components {
  const darkMode = theme.palette.mode === 'dark'
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '.MuiInputBase-root, .MuiInputBase-root.MuiInputBase-sizeSmall': {
            paddingTop: '0px',
            paddingBottom: '0px',
          },
        },
      },
    },
  }
}
