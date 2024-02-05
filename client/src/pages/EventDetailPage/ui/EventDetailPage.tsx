import cls from './EventDetailPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useEffect, useState} from 'react'
import { Box } from 'shared/ui/Box'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getEventDetailIsLoading } from '../model/selectors/getEventDetailIsLoading/getEventDetailIsLoading'
import { getEventDetailError } from '../model/selectors/getEventDetailError/getEventDetailError'
import { Event, addEvent, getEventById, updateEventData } from 'entities/Event'
import { PageLoader } from 'widgets/PageLoader'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { useTranslation } from 'react-i18next'
import { fetchEventTypes } from 'entities/EventType'
import { eventDetailAction, eventDetailReducer } from '../model/slice/EventDetailPageSlice'
import { getEventDetailsForm } from '../model/selectors/getEventDetailsForm/getEventDetailsForm'
import { getEventDetailsEventTypes } from '../model/selectors/getEventDetailsEventTypes/getEventDetailsEventTypes'
import { EventForm } from 'entities/Event/ui/EventForm/EventForm'
import { calendarPageAction } from 'pages/CalendarPage'

interface EventDetailPageProps {
  className?: string,
  isNew?: boolean,
}

const eventInitialState: Event = {
    _id: '',
    title: '',
    userId: '',
    eventType: '',
    startTime: '',
    endTime: '',
    place: '',
    notes: '',
    eventDate: ''
}

const reducers: ReducersList = {
    EventDetailsPage: eventDetailReducer
}

export const EventDetailPage = memo(({className, isNew = false} : EventDetailPageProps) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const isLoading = useSelector(getEventDetailIsLoading)
    const eventData = useSelector(getEventDetailsForm) || eventInitialState
    const error = useSelector(getEventDetailError)
    const eventTypes = useSelector(getEventDetailsEventTypes)|| []
    const [errors] = useState({})
    const [added, setAdded] = useState(false)
    const [changed, setChanged] = useState(false)

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchEventTypes())
            if (!isNew && id) {
                dispatch(getEventById(id))
            } else {
                dispatch(eventDetailAction.newEvent())
            }
        }
    }, [dispatch, id, isNew])

    const handleChangeTitle = (value: string) => {
        dispatch(eventDetailAction.changeEvent({title: value}))
    }

    const handleChangeEventDate = (value: string) => {
        dispatch(eventDetailAction.changeEvent({eventDate: value}))
    }

    const handleChangeEventType = (value: string) => {
        dispatch(eventDetailAction.changeEvent({eventType: value}))
    }

    const handleChangePlace = (value: string) => {
        dispatch(eventDetailAction.changeEvent({place: value}))
    }
    const handleChangeStartTime = (value: string) => {
        dispatch(eventDetailAction.changeEvent({startTime: value}))
    }

    const handleChangeEndTime = (value: string) => {
        dispatch(eventDetailAction.changeEvent({endTime: value}))
    }
    const handleChangeEventNotes = (value: string) => {
        dispatch(eventDetailAction.changeEvent({notes: value}))
    }
    const handleSave = () => {
        if (isNew) {
            dispatch(addEvent()).then((data) => {
                setAdded(true)
                setInterval(() => {
                    setAdded(false)
                }, 3000)
                dispatch(calendarPageAction.eventAdded(data.payload))
                dispatch(eventDetailAction.newEvent())
            })
        } else {
            dispatch(updateEventData(eventData._id)).then(() => {
                setChanged(true)
                setInterval(() => {
                    setChanged(false)
                }, 3000)
            })
        }
        
    }

    if (isLoading) return <PageLoader />
    if (error) return <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так. Данные не получены')} />

  
    return ( <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true} >
        <div>
            <Box className={classNames(cls.EventDetailPage, {}, [className])}>
                <h1>{isNew ? t('Добавить событие') : t('Редактировать событие')}</h1>
                <EventForm 
                    errors={errors} 
                    data={eventData} 
                    events={eventTypes} 
                    onChangeTitle={handleChangeTitle} 
                    onChangeEventDate={handleChangeEventDate} 
                    onChangePlace={handleChangePlace} 
                    onChangeStartTime={handleChangeStartTime} 
                    onChangeEndTime={handleChangeEndTime} 
                    onChangeEventType={handleChangeEventType} 
                    onChangeEventNotes={handleChangeEventNotes} 
                    onSave={handleSave} />
            </Box>
            {added && isNew && <Alert theme={AlertTheme.SUCCESS} text={t('Событие успешно добавлено')} className={cls.alert} />}
            {changed && !isNew && <Alert theme={AlertTheme.SUCCESS} text={t('Событие успешно изменено')} className={cls.alert} />}
        </div>
    </DynamicModuleLoader>
        
    )
})