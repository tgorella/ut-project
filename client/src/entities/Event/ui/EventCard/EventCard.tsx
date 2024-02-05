import cls from './EventCard.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Event } from '../../model/types/Event'
import { transformDate } from 'shared/lib/transformDate/transformDate'
import { useTranslation } from 'react-i18next'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { Link } from 'react-router-dom'


interface EventCardProps {
  className?: string;
  event: Event,
  onDelete: (id: string) => void
}
export const EventCard = memo(({className, event, onDelete} : EventCardProps) => {
    const {t} = useTranslation('events')

    const handleDeleteEvent = (id: string) => {
        if (id) {
            onDelete(id)
        }
    }
    
    if (!event) {
        return <Alert text={t('Нет данных')} theme={AlertTheme.ERROR} />
    }
    return ( 
        <section className={classNames(cls.EventCard, {}, [className])}>
            <h2 className={cls.title}>{event.title}</h2>
            <p><b>{t('Дата')}:</b> {transformDate(event.eventDate)}</p>
            <p><b>{t('Время')}:</b> {event.startTime} - {event.endTime}</p>
            <p><b>{t('Адрес')}:</b> {event.place}</p>
            <p className={cls.notes_title}><b>{t('Заметки')}:</b></p>
            <p className={cls.notes}>{event.notes}</p>
            {event.eventType === 'work' && <Alert className={cls.alert} theme={AlertTheme.INFO} text={t('Это событие относится к заказам')} />}

            {event.eventType !== 'work' &&
            <div className={cls.button_wrapper}>
                <AppButton theme={ButtonTheme.OUTLINED} stretch={true} onClick={() => handleDeleteEvent(event._id)} >{t('Удалить')}</AppButton>
                <Link to={'/events/'+event._id}><AppButton theme={ButtonTheme.SOLID} stretch={true} >{t('Редактировать')}</AppButton></Link>
            </div>
            }

            {event.eventType === 'work' &&
            <div className={cls.button_wrapper}>
                <Link to={'/orders/'+event._id}><AppButton theme={ButtonTheme.SOLID} stretch={true} >{t('Редактировать')}</AppButton></Link>
            </div>
            }
            
        </section>
    )
})