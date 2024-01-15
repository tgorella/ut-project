import cls from './EventsListItem.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Event } from '../../model/types/Event'
import { Order } from 'entities/Order'
import { getDayName } from 'shared/lib/getDayName/getDayName'
import { getMonthName } from 'shared/lib/getMonthName/getMonthName'


interface EventListItemProps {
  className?: string;
  event: Event | Order,
  color: string
}

function getDayNumber (item: string) {
    return new Date(item).getDate()
}

export const EventListItem = memo(({className, event, color} : EventListItemProps) => {

    const dayName = getDayName(event.eventDate)
    const monthName = getMonthName(event.eventDate)
    const dayNumber = getDayNumber(event.eventDate)
    const year = new Date(event.eventDate).getFullYear()

    return ( 
        <div key={event._id} className={classNames(cls.item, {}, [className])}
            style={{borderLeftColor: color}}>
            <div className={cls.date_wrapper}>
                <div>{monthName}</div>
                <div className={cls.number}>{dayNumber}</div>
                <div>{year}</div>
            </div>
            <div className={cls.day}>{dayName}</div>
            <div className={cls.event_info}>
                <p>{event.title}</p>
                <p>{event.place}</p>
            </div>
        </div>
    )
})