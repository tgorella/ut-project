import cls from './EventCard.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Event } from '../../model/types/Event'
import { transformDate } from 'shared/lib/transformDate/transformDate'
import { useTranslation } from 'react-i18next'
import { Alert, AlertTheme } from 'shared/ui/Alert'


interface EventCardProps {
  className?: string;
  event: Event | undefined
}
export const EventCard = memo(({className, event} : EventCardProps) => {
    const {t} = useTranslation('events')
    if (!event) {
        return <Alert text={t('Нет данных')} theme={AlertTheme.ERROR} />
    }
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