import { EventBlock, EventCard, EventExtended, deleteEvent } from 'entities/Event'
import cls from './Calendar.module.scss'
import { BodyObj } from './lib/genCalendarBodyObj'
import { useSelector } from 'react-redux'
import { getEventTypeEditData } from 'widgets/EventTypesEdit/model/selectors/getEventTypeEditData/getEventTypeEditData'
import { PreviewWindow } from '../../PreviewWindow'
import { useState } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Alert, AlertTheme } from '../../Alert'
import { useTranslation } from 'react-i18next'

interface CalendarBodyProps {
  days: BodyObj
}

const clearEvent: EventExtended = {
    _id: '',
    title: '',
    userId: '',
    eventType: {
        _id: '',
        color: '',
        name: '',
        isDefault: false
    },
    eventDate: '',
    startTime: '',
    endTime: '',
    place: '',
    notes: ''
}
export const CalendarBody = ({days} : CalendarBodyProps) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState(clearEvent)
    const eventTypes = useSelector(getEventTypeEditData) 
    const [deleted, setDeleted] = useState(false) 
  
    const togglePreviewWindow = () => {
        setOpen((prev) => !prev)
    }

    const eventToggle = (event: EventExtended) => {
        togglePreviewWindow()
        setContent(event)
    }

    const handleDelete = (id: string) => {
        dispatch(deleteEvent(id)).then(() => {
            setOpen(false)
            setContent(clearEvent)
            setDeleted(true)
            setInterval(() => {
                setDeleted(false)
            }, 3000)
        })
    }
    const colors: Record<string, string> = {}
    eventTypes?.forEach((type) => colors[type._id] = type.color)
    colors.work = '#fdd35f'

    return (  
        <div className={cls.bodyWrapper}> 
            {days.map((day, index) => {
                return (<div key={'day_' + index} className={day.number ? cls.day: ''}>
                    {day.number}
                    {day.events?.map((event) => <EventBlock key={event._id} event={event} onClick={() => eventToggle(event)} />)}
                </div>)
            })}
            <PreviewWindow isOpen={open} onClose={togglePreviewWindow}>
                <EventCard event={content} onDelete={handleDelete}/>
            </PreviewWindow>
            {deleted && <Alert theme={AlertTheme.SUCCESS} text={t('Событие успешно удалено')}  className={cls.alert} />}
        </div>
    )
}