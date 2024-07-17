import cls from './File.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo} from 'react'

interface FileProps {
  className?: string;
}
export const File = memo(({className} : FileProps) => {

    return ( 
        <div className={classNames(cls.File, {}, [className])}>
      
        </div>
    )
})