import cls from './Project.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'

interface ProjectProps {
  className?: string;
}
export const Project = memo(({className} : ProjectProps) => {

    return ( 
        <div className={classNames(cls.Project, {}, [className])}>
      
        </div>
    )
})