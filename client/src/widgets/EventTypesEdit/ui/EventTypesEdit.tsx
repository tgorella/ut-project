import cls from './EventTypesEdit.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'

interface EventTypesEditProps {
  className?: string;
}
export const EventTypesEdit = memo(({className} : EventTypesEditProps) => {

  return ( 
    <div className={classNames(cls.EventTypesEdit, {}, [className])}>
      
    </div>
   );
})