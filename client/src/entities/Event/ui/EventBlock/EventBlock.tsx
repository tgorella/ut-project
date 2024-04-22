import cls from './EventBlock.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {HTMLAttributes, memo} from 'react'
import { EventExtended } from '../../model/types/Event'


interface EventBlockProps  extends HTMLAttributes<HTMLDivElement>{
  className?: string;
  event: EventExtended
}
export const EventBlock = memo(({className, event, ...props} : EventBlockProps) => {
    
    return ( 
        <div className={classNames(cls.eventBlock, {}, [className])} style={{backgroundColor: event.eventType?.color ? event.eventType?.color : 'white'}} {...props} >
            {event.title}
        </div>
    )
})