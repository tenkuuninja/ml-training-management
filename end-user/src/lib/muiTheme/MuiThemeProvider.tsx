import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import useMuiTheme from './useMuiTheme'

interface IMuiThemeProviderProps {
  children?: React.ReactNode
}

export function MuiThemeProvider({ children }: IMuiThemeProviderProps) {
  const theme = useMuiTheme()

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}
