import cls from './EventList.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { PageLoader } from 'widgets/PageLoader'
import { EventListItem } from '../EventsListItem/EventsListItem'
import { Event } from 'entities/Event/model/types/Event'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { useTranslation } from 'react-i18next'


interface EventCardProps {
  className?: string;
  events: Event[]
  isLoading: boolean,
  error?: string
}
export const EventsList = memo(({className, events, isLoading, error} : EventCardProps) => {
    const {t} = useTranslation('events')

    if (events) {
        events.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
    }
    
    const colors : {[k: string]: string}= {
        personal: 'gold',
        friends: 'green'
    }

    if (isLoading) {
        return <PageLoader />
    }
    if (error) {
        return <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так. Не удалось загрузить данные')}/>
    }

    return ( 
        <div className={classNames(cls.eventsList, {}, [className])}>
            {events.map((event: Event) => {
                return <EventListItem 
                    key={event._id}
                    event={event} 
                    color={colors[event.eventType]}/>
            })}
        </div>
    )
})