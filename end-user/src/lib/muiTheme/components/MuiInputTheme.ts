import { Components, Theme } from '@mui/material'

export default function MuiInputTheme(theme: Theme): Components {
  const darkMode = theme.palette.mode === 'dark'
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          legend: {
            height: '11px',
            width: 'auto',
          },
        },
        input: {
          height: 48,
          boxSizing: 'border-box',
          '&.MuiInputBase-inputSizeSmall': {
            height: 40,
          },
        },
      },
    },
  }
}
