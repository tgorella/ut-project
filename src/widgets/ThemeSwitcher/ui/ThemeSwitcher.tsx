import { Theme, useTheme } from 'app/providers/ThemeProvider'
import cls from './ThemeSwitcher.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'

interface ThemeSwitcherProps {
  className?: string
}
export const ThemeSwitcher = ({ className = '' }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className={classNames(cls.switcherWrapper, {}, [className])}>
    <div onClick={toggleTheme} className={classNames(cls.themeSwitcher, {}, [theme === Theme.LIGHT ? cls.light : cls.dark])}>
      <div className={classNames(cls.button)}></div>
    </div>
    </div>
  )
}
