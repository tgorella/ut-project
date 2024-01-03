import classNames from 'shared/lib/classNames/ClassNames'
import cls from './Vstack.module.scss'
import {ReactNode, memo} from 'react'

interface VstackProps {
  children: ReactNode,
  className?: string
}
export const Vstack = memo(({children, className} : VstackProps) => {
    return ( 
        <div className={classNames(cls.Vstack, {}, [className])}>
            {children}
        </div>
    )
})