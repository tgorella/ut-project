import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext'

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        let newTheme 
        
        switch (theme) {
        case Theme.LIGHT:
            newTheme = Theme.GREEN
            break
        case Theme.GREEN:
            newTheme = Theme.DARK
            break
        case Theme.DARK:
            newTheme = Theme.LIGHT
            // eslint-disable-next-line no-fallthrough
        default:
            newTheme = Theme.LIGHT
            break
        }

        setTheme?.(newTheme)
        document.body.className = newTheme || 'app_light_theme'
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    return { theme: theme || Theme.LIGHT, toggleTheme }
}
