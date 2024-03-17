import { Components, Theme } from '@mui/material'

export default function MuiButtonTheme(theme: Theme): Components {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 700,
          '&.MuiButton-sizeLarge': {
            lineHeight: '2rem',
          },
          '.MuiLoadingButton-loadingIndicator': {
            '&.MuiLoadingButton-loadingIndicatorCenter': {
              top: '50%',
              transform: 'translate(-50%, -50%)',
            },
          },
        },
      },
    },
  }
}
