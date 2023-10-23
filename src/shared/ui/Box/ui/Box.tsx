import cls from './Box.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { BoxHead } from './BoxHead'
import { BoxFooter } from './BoxFooter'

interface BoxProps {
  className?: string;
  children: React.ReactNode;
  header?: string | React.ReactNode;
  footer?: React.ReactNode
}
export const Box = ({className, children, header, footer} : BoxProps) => {

    return ( 
        <div className={classNames(cls.Box, {}, [className])}>
            {header && <BoxHead title={header}/>}
            <div className={cls.content}>
                {children}
            </div>
            {footer && <BoxFooter content={footer} />}
        </div>
    )
}