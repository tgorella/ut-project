import cls from './EventBlock.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {HTMLAttributes, memo} from 'react'
import { Event } from 'entities/Event/model/types/Event'


interface EventBlockProps  extends HTMLAttributes<HTMLDivElement>{
  className?: string;
  event: Event,
  color: string
}
export const EventBlock = memo(({className, event, color, ...props} : EventBlockProps) => {
    
    return ( 
        <div className={classNames(cls.eventBlock, {}, [className])} style={{backgroundColor: color}} {...props} >
            {event.title}
        </div>
    )
})