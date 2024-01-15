import cls from './EventBlock.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Event } from 'entities/Event/model/types/Event'


interface EventBlockProps {
  className?: string;
  event: Event,
  color: string
}
export const EventBlock = memo(({className, event, color} : EventBlockProps) => {
    
    return ( 
        <div className={classNames(cls.eventBlock, {}, [className])} style={{backgroundColor: color}}>
            {event.title}
        </div>
    )
})