import { Components, Theme } from '@mui/material'

export default function MuiLabelTheme(theme: Theme): Components {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: -4,
          '&.MuiInputLabel-sizeSmall': {
            top: 0,
          },
          '&.MuiFormLabel-filled, &.Mui-focused': {
            top: 0,
          },
        },
      },
    },
  }
}
