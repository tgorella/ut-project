import cls from './Flex.module.scss'
import classNames, { Mods } from 'shared/lib/classNames/ClassNames'
import {ReactNode, memo} from 'react'

export type FlexJustify = 'end' | 'start' | 'center' | 'between'
export type FlexAlign = 'end' | 'start' | 'center'
export type FlexDirection = 'column' | 'row'
export type FlexGap = '10' | '20' | '30'

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    end: cls.justifyEnd,
    center: cls.justifyCenter,
    between: cls.justifyBetween
}

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    end: cls.alignEnd,
    center: cls.alignCenter
}

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn
}

const gapClasses: Record<FlexGap, string> = {
    10: cls.gap10,
    20: cls.gap20,
    30: cls.gap30
}

export interface FlexProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection,
  gap?: FlexGap,
  max?: boolean
}
export const Flex = memo(({
    className, 
    children, 
    justify = 'start', 
    align = 'center', 
    direction = 'row',
    gap,
    max
} : FlexProps) => {

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap]
    ]

    const mods: Mods = {
        [cls.max]: max
    }
    return ( 
        <div className={classNames(cls.Flex, mods, [...classes])}>
            {children}
        </div>
    )
})