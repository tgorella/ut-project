import { memo } from 'react'
import cls from './Box.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'

interface BoxHeadProps {
  className?: string;
  title: string | React.ReactNode
}
export const BoxHead = memo(({className, title} : BoxHeadProps) => {

    return ( 
        <div className={classNames(cls.header, {}, [className])}>
            {title}
        </div>
    )
})