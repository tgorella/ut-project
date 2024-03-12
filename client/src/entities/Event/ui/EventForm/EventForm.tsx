import cls from './EventForm.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Event, EventExtended } from '../../model/types/Event'
import { Input } from 'shared/ui/Input/Input'
import { useTranslation } from 'react-i18next'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { EventType, EventTypeSelect } from 'entities/EventType'


interface EventFormProps {
  className?: string;
  errors: Partial<Event>
  data: EventExtended,
  events: EventType[]
  onChangeTitle: (value: string) => void,
  onChangeEventDate: (value: string) => void,
  onChangePlace: (value: string) => void,
  onChangeStartTime: (value: string) => void,
  onChangeEndTime: (value: string) => void,
  onChangeEventType: (value: string) => void,
  onChangeEventNotes: (value: string) => void,
  onSave: () => void
}
export const EventForm = memo(({
    className, 
    data, 
    errors,
    events,
    onChangeEndTime, 
    onChangeEventDate, 
    onChangePlace, 
    onChangeEventType, 
    onChangeStartTime, 
    onChangeTitle, 
    onChangeEventNotes,
    onSave
} : EventFormProps) => {
    const {t} = useTranslation('events')

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSave()
    }
    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChangeEventNotes(e.target.value)
    }
    
    return ( 
        <form onSubmit={handleSave} className={classNames(cls.eventForm, {}, [className])}>
            <Input 
                label={t('Заголовок')} 
                value={data?.title}  
                onChange={onChangeTitle} 
                name='title'
                error={errors?.title}
            />
            <EventTypeSelect 
                value={data?.eventType._id}
                eventTypes={events}
                onChange={onChangeEventType}/>
            <Input 
                label={t('Дата')} 
                value={data?.eventDate}  
                onChange={onChangeEventDate} 
                name='eventDate' 
                error={errors?.eventDate}
                type='date'
            />
            <Input 
                label={t('Время начала')} 
                value={data?.startTime}  
                onChange={onChangeStartTime} 
                name='startTime' 
                error={errors?.startTime}
                type='time'
            />
            <Input 
                label={t('Время окончания')} 
                value={data?.endTime}  
                onChange={onChangeEndTime} 
                name='endTime' 
                error={errors?.endTime}
                type='time'
            />
            <Input 
                label={t('Адресс')} 
                value={data?.place}  
                onChange={onChangePlace} 
                name='place' 
                error={errors?.place}
            />
            <div>{t('Заметки')}:</div>
            <textarea 
                value={data?.notes}  
                rows={5}
                onChange={handleNotesChange} 
                name='notes' 
            />
            {errors.notes && <Alert theme={AlertTheme.ERROR} text={errors.notes} />}
            <AppButton 
                type='submit'
                theme={ButtonTheme.OUTLINED}
                disabled={Object.values(errors).filter((item) => item !== '').length > 0 ? true : false}
            >
                {t('Сохранить')}
            </AppButton>

        </form>
    )
})