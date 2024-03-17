import { Theme } from '@mui/material'
import MuiAutoCompleteTheme from './MuiAutoCompleteTheme'
import MuiButtonTheme from './MuiButtonTheme'
import MuiInputTheme from './MuiInputTheme'
import MuiLabelTheme from './MuiLabelTheme'
import MuiProgress from './MuiProgressTheme'
import MuiSelectTheme from './MuiSelectTheme'
import MuiTabsTheme from './MuiTabsTheme'

export default function componentsOverrides(theme: Theme) {
  return {
    ...MuiAutoCompleteTheme(theme),
    ...MuiButtonTheme(theme),
    ...MuiInputTheme(theme),
    ...MuiSelectTheme(theme),
    ...MuiLabelTheme(theme),
    ...MuiTabsTheme(theme),
    ...MuiProgress(theme),
  }
}
