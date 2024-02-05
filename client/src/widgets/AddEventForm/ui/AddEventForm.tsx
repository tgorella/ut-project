import {memo, useEffect, useState} from 'react'
import { EventForm } from 'entities/Event/ui/EventForm/EventForm'
import { useSelector } from 'react-redux'
import { getEventFormData } from 'entities/Event/model/selectors/getEventFormData/fetEventFormData'
import { getEventError } from 'entities/Event/model/selectors/getEventError/getEventError'
import { getEventIsLoading } from 'entities/Event/model/selectors/getEventIsLoading/getEventIsLoading'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { eventAction, eventReducer } from 'entities/Event'
import { PageLoader } from 'widgets/PageLoader'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { addEvent } from 'entities/Event/model/services/addEvent/addEvent'
import { eventTypesEditReducer } from 'widgets/EventTypesEdit'
import { getEventTypeEditData } from 'widgets/EventTypesEdit/model/selectors/getEventTypeEditData/getEventTypeEditData'
import { fetchEventTypes } from 'entities/EventType'
import { Box } from 'shared/ui/Box'
import { calendarPageAction } from 'pages/CalendarPage'

// interface AddEventFormProps {
//   className?: string;
// }

const eventInitialState = {
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

const reducers : ReducersList = {
    eventDetails: eventReducer,
    eventTypesEditSchema: eventTypesEditReducer
}
export const AddEventForm = memo(() => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const events = useSelector(getEventTypeEditData) || []
    const data = useSelector(getEventFormData) || eventInitialState
    const error = useSelector(getEventError)
    const isLoading = useSelector(getEventIsLoading)
    const [errors] = useState({})

    useEffect(() => {
        dispatch(eventAction.newEvent())
        dispatch(fetchEventTypes())
    }, [dispatch])

    const handleChangeTitle = (value: string) => {
        dispatch(eventAction.updateEvent({title: value}))
    }

    const handleChangeEventDate = (value: string) => {
        dispatch(eventAction.updateEvent({eventDate: value}))
    }

    const handleChangeEventType = (value: string) => {
        dispatch(eventAction.updateEvent({eventType: value}))
    }

    const handleChangePlace = (value: string) => {
        dispatch(eventAction.updateEvent({place: value}))
    }
    const handleChangeStartTime = (value: string) => {
        dispatch(eventAction.updateEvent({startTime: value}))
    }

    const handleChangeEndTime = (value: string) => {
        dispatch(eventAction.updateEvent({endTime: value}))
    }
    const handleChangeEventNotes = (value: string) => {
        dispatch(eventAction.updateEvent({notes: value}))
    }
    const handleSave = () => {
        dispatch(addEvent()).then((data) => {
            dispatch(calendarPageAction.eventAdded(data.payload))
            dispatch(eventAction.newEvent())
        })
    }

    if (isLoading) {
        return <PageLoader />
    }

    if (error) {
        return <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так')} />
    }
    return ( 
        <DynamicModuleLoader reducers={reducers} >
            <Box>
                <EventForm 
                    events={events}
                    errors={errors}
                    data={data}
                    onChangeEndTime={handleChangeEndTime}
                    onChangeEventDate={handleChangeEventDate}
                    onChangeEventNotes={handleChangeEventNotes}
                    onChangeEventType={handleChangeEventType}
                    onChangePlace={handleChangePlace}
                    onChangeStartTime={handleChangeStartTime}
                    onChangeTitle={handleChangeTitle}
                    onSave={handleSave}
                />
            </Box>
            
        </DynamicModuleLoader>
    )
})