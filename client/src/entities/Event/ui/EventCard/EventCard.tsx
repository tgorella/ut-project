import cls from './EventCard.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Event } from '../../model/types/Event'
import { transformDate } from 'shared/lib/transformDate/transformDate'
import { Order } from 'entities/Order'
import { useTranslation } from 'react-i18next'


interface EventCardProps {
  className?: string;
  event: Event | Order
}
export const EventCard = memo(({className, event} : EventCardProps) => {
    const {t} = useTranslation('events')

    return ( 
        <section className={classNames(cls.EventCard, {}, [className])}>
            <h2 className={cls.title}>{event.title}</h2>
            <p><b>{t('Дата')}:</b> {transformDate(event.eventDate)}</p>
            <p><b>{t('Время')}:</b> {event.startTime} - {event.endTime}</p>
            <p><b>{t('Адрес')}:</b> {event.place}</p>
            <p className={cls.notes}><b>{t('Заметки')}:</b> {event.notes}</p>
        </section>
    )
})