import cls from './BulletMenu.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'


interface BulletMenuProps {
  className?: string;
  
}
export const BulletMenu = memo(({className} : BulletMenuProps) => {

    return ( 
        <div className={classNames(cls.BulletMenu, {}, [className])}>
      
        </div>
    )
})