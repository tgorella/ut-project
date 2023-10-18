import classNames, { Mods } from 'shared/lib/classNames/ClassNames'
import cls from './AppButton.module.scss'
import { ButtonHTMLAttributes, ReactNode, memo } from 'react'
import { Theme } from 'app/providers/ThemeProvider'


export enum ButtonTheme {
  CLEAR = 'clear',
  SOLID = 'solid',
  OUTLINED = 'outlined'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string,
  theme?: ButtonTheme,
  square?: boolean,
  rounded?: boolean,
  size?: ButtonSize,
  disabled?: boolean,
  children: ReactNode
}


export const AppButton= memo((props: AppButtonProps) => {
    const { className, children, theme = Theme.LIGHT, square, rounded, size = ButtonSize.M, disabled, ...otherProps } = props
    const mods:Mods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.rounded]: rounded,
        [cls.disabled]: disabled
    }
    return (
        <button
            className={classNames(cls.AppButton, mods, [className])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    )
})
