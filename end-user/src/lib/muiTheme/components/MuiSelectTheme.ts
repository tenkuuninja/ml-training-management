import { Components, Theme } from '@mui/material'

export default function MuiSelectTheme(theme: Theme): Components {
  return {
    MuiSelect: {
      styleOverrides: {
        select: {
          height: 48,
          padding: '12.5px 14px',
          '&.MuiInputBase-inputSizeSmall': {
            height: 40,
            padding: '8.5px 14px',
          },
        },
        nativeInput: {
          opacity: 1,
          border: 'none',
          color: 'transparent',
          background: 'transparent',
          top: '50%',
          bottom: 'auto',
          transform: 'translate(0, -50%)',
          paddingLeft: 12,
          '::placeholder': {
            opacity: 1,
            color: '#bbb',
          },
        },
      },
    },
  }
}
