import classNames, { Mods } from 'shared/lib/classNames/ClassNames'
import cls from './AppButton.module.scss'
import { ButtonHTMLAttributes, ReactNode, memo } from 'react'


export enum ButtonTheme {
  CLEAR = 'clear',
  SOLID = 'solid',
  OUTLINED = 'outlined',
  GRAY = 'gray',
  OUTLINED_GRAY = 'outlined_gray'
}

export enum ButtonSize {
  S = 'size_s',
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
  children: ReactNode,
  stretch?: boolean,
}


export const AppButton= memo((props: AppButtonProps) => {
    const { className, children, theme = ButtonTheme.OUTLINED, square, rounded, size = ButtonSize.M, disabled, stretch = false, ...otherProps } = props
    const mods:Mods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.rounded]: rounded,
        [cls.disabled]: disabled,
        [cls.stretch]: stretch
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
