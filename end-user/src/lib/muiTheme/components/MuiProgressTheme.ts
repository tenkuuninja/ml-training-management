import { Components, Theme } from '@mui/material'

export default function MuiProgressTheme(theme: Theme): Components {
  return {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          '.MuiCircularProgress-circle': {
            animationDuration: '800ms',
          },
        },
      },
    },
  }
}
