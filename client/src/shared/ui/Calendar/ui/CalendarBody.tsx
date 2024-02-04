import { Event, EventBlock, EventCard } from 'entities/Event'
import cls from './Calendar.module.scss'
import { BodyObj } from './lib/genCalendarBodyObj'
import { useSelector } from 'react-redux'
import { getEventTypeEditData } from 'widgets/EventTypesEdit/model/selectors/getEventTypeEditData/getEventTypeEditData'
import { PreviewWindow } from 'shared/ui/PreviewWindow'
import { useState } from 'react'

interface CalendarBodyProps {
  days: BodyObj
}

const clearEvent: Event = {
    _id: '',
    title: '',
    userId: '',
    eventType: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    place: '',
    notes: ''
}
export const CalendarBody = ({days} : CalendarBodyProps) => {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState(clearEvent)
    const eventTypes = useSelector(getEventTypeEditData)  
  
    const togglePreviewWindow = () => {
        setOpen((prev) => !prev)
    }

    const eventToggle = (event: Event) => {
        togglePreviewWindow()
        setContent(event)
    }
    const colors: Record<string, string> = {}
    eventTypes?.forEach((type) => colors[type._id] = type.color)
    colors.work = '#fdd35f'

    return (  
        <div className={cls.bodyWrapper}> 
            {days.map((day, index) => {
                return (<div key={'day_' + index} className={day.number ? cls.day: ''}>
                    {day.number}
                    {day.events?.map((event) => <EventBlock key={event._id} event={event}  color={colors[event.eventType as keyof typeof colors]} onClick={() => eventToggle(event)} />)}
                </div>)
            })}
            <PreviewWindow isOpen={open} onClose={togglePreviewWindow}>
                <EventCard event={content} />
            </PreviewWindow>
        </div>
    )
}