import classNames from 'shared/lib/classNames/ClassNames'
import cls from './HStack.module.scss'
import {ReactNode, memo} from 'react'

interface HStackProps {
  children: ReactNode,
  className?: string
}
export const HStack = memo(({className,children} : HStackProps) => {
    return ( 
        <div className={classNames(cls.HStack, {}, [className])}>
            {children}
        </div>
    )
})