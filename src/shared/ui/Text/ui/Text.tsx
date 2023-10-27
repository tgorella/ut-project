import { memo } from 'react'
import cls from './Text.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'

export enum TextTheme {
  DEFAULT = 'text',
  WARNING = 'warning',
}

export enum TextAlign {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center'
}
interface TextProps {
  className?: string;
  title?: string,
  text?: string,
  theme?: TextTheme,
  align?: TextAlign
}
export const Text = memo(({className, title, text, theme = TextTheme.DEFAULT, align = TextAlign.LEFT} : TextProps) => {
    const textMods = {
        [cls[theme]]: true
    }
    return ( 
        <div className={classNames(cls.Text, {}, [className, cls[align]])}>
            { title && <p className={cls.title}>{title}</p>}
            {text && <p className={classNames('', textMods, [])}>{text}</p>}
        </div>
    )
})