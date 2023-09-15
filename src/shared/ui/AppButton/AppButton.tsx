import classNames from 'shared/lib/classNames/ClassNames'
import cls from './AppButton.module.scss'
import { ButtonHTMLAttributes, FC } from 'react'


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
  size?: ButtonSize
}


export const AppButton: FC<AppButtonProps> = (props) => {
    const { className, children, theme, square, size = ButtonSize.M, ...otherProps } = props
    const mods:Record<string,boolean> = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true
    }
    return (
        <button
            className={classNames(cls.AppButton, mods, [className])}
            {...otherProps}
        >
            {children}
        </button>
    )
}
