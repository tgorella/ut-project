import { Theme, useTheme } from 'app/providers/ThemeProvider'
import cls from './ThemeSwitcher.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { memo } from 'react'

interface ThemeSwitcherProps {
  className?: string
}
export const ThemeSwitcher = memo(({ className = '' }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme()
    let buttonClass

    switch (theme) {
    case Theme.LIGHT:
        buttonClass = cls.light
        break
    case Theme.DARK:
        buttonClass = cls.dark
        break
    case Theme.GREEN:
        buttonClass = cls.green
        break
    default:
        buttonClass = cls.light
        break
    }

    return (
        <div className={classNames(cls.switcherWrapper, {}, [className])}>
            <div onClick={toggleTheme} className={classNames(cls.themeSwitcher, {}, [buttonClass])}>
                <div className={classNames(cls.button)}></div>
            </div>
        </div>
    )
})
