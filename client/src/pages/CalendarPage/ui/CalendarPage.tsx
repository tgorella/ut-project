import cls from './CalendarPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar } from 'shared/ui/Calendar'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { calendarPageReducer } from '../model/slice/CalendarPageSlice'
import { useSelector } from 'react-redux'
import { getCalendarPageIsLoading } from '../model/selectors/getCalendarPageIsLoading/getCalendarPageIsLoading'
import { getCalendarPageError } from '../model/selectors/getCalendarPageError/getCalendarPageError'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { eventAction, eventReducer, fetchEvents } from 'entities/Event'
import { PageLoader } from 'widgets/PageLoader'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { BulletMenu } from 'shared/ui/BulletMenu'
import { bulletMenuItemSchema } from 'shared/ui/BulletMenu/model/types/bulletMenuItemSchema'
import { AddEventForm } from 'widgets/AddEventForm'
import { eventTypesEditReducer } from 'widgets/EventTypesEdit'
import { fetchEventTypes } from 'entities/EventType'

interface CalendarPageProps {
  className?: string;
}

const reducers: ReducersList = {
    CalendarPage: calendarPageReducer,
    eventDetails: eventReducer,
    eventTypesEditSchema: eventTypesEditReducer

}
export const CalendarPage = memo(({className} : CalendarPageProps) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getCalendarPageIsLoading)
    const error = useSelector(getCalendarPageError)
    
    const [path, setPath] = useState('calendar')
    
    useEffect(() => {
        dispatch(fetchEvents())
        dispatch(eventAction.newEvent())
        dispatch(fetchEventTypes())
    }, [dispatch])
    
    const [content, setPageContent] = useState(<Calendar />)

    const items: bulletMenuItemSchema[]  = [{
        text: t('Календарь'),
        elementName: 'calendar'
    },
    {
        text: t('Добавить событие'),
        elementName: 'add_event'
    }
    ]

    const togglePages = (name: string) => {
        if (name === 'calendar') {
            setPageContent(<Calendar />)
            setPath(name)
        }
        if (name === 'add_event') {
            setPageContent(<AddEventForm />)
            setPath(name)
        }
    }

    if (isLoading) {
        return <PageLoader />
    }

    if (error) {
        return <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так. Не получилось получить данные')} />
    }

    return ( 
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.CalendarPage, {}, [className])}>
                <BulletMenu items={items} onClick={togglePages} path={path}/>
                {content}
            </div>
        </DynamicModuleLoader>
        
    )
})