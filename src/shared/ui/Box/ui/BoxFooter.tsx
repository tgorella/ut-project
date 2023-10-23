import cls from './Box.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'

interface BoxFooterProps {
  className?: string;
  content: string | React.ReactNode
}
export const BoxFooter = ({className, content} : BoxFooterProps) => {

    return ( 
        <div className={classNames(cls.footer, {}, [className])}>
            {content}
        </div>
    )
}