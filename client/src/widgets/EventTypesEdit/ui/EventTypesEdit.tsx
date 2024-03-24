import cls from './EventTypesEdit.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useEffect, useState} from 'react'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { eventTypesEditAction, eventTypesEditReducer } from '../model/slice/EventTypesEditSlice'
import { useSelector } from 'react-redux'
import { getEventTypeEditError } from '../model/selectors/getEventTypeEditError/getEventTypeEditError'
import { getEventTypeEditIsLoading } from '../model/selectors/getEventTypeEditIsLoading/getEventTypeEditIsLoading'
import { getEventTypeEditData } from '../model/selectors/getEventTypeEditData/getEventTypeEditData'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useTranslation } from 'react-i18next'
import { getEventTypeEditTypeId } from '../model/selectors/geetEventTypeEditTypeId/geetEventTypeEditTypeId'
import { getEventTypeEditNewData } from '../model/selectors/getEventTypeEditNewData/getEventTypeEditNewData'
import { EventType, EventTypeInput, addEventType, deleteEventType, fetchEventTypes, updateEventType } from 'entities/EventType'
import { PageLoader } from 'widgets/PageLoader'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { Box } from 'shared/ui/Box'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { VStack } from 'shared/ui/Stack'

interface EventTypesEditProps {
  className?: string;
}

const initial = {
    isDefault: false,
    name: '',
    color: '#000000',
    _id: 'new'
}

const reducers: ReducersList = {
    eventTypesEditSchema: eventTypesEditReducer
}
const EventTypesEdit = memo(({className} : EventTypesEditProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation('events')
    const editTypeId = useSelector(getEventTypeEditTypeId) || ''
    const newData = useSelector(getEventTypeEditNewData) || initial
    const isLoading = useSelector(getEventTypeEditIsLoading)
    const error = useSelector(getEventTypeEditError)
    const data = useSelector(getEventTypeEditData)

    const [showNewInput, setShowNewInput] = useState(false)

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchEventTypes())
        }
    }, [dispatch])

    const clearNewDataState = () => {
        dispatch(eventTypesEditAction.clearEventData())
        dispatch(eventTypesEditAction.clearEventId())
    }
    const toggleInput = (id: string, name: string, color: string) => {
        dispatch(eventTypesEditAction.updateEditEventId(id))
        dispatch(eventTypesEditAction.updateEventData({name: name, color: color, _id: id}))
    }

    const handleChancelEdit = () => {
        clearNewDataState()
    }

    const handleChangeName = (value: string) => {
        dispatch(eventTypesEditAction.updateEventData({name: value}))
    }

    const handleChangeColor = (value: string) => {
        dispatch(eventTypesEditAction.updateEventData({color: value}))
    }

    const handleSaveEventType = () => {
        dispatch(updateEventType({...newData, _id: editTypeId}))
        clearNewDataState()
    }

    const handleDelete = (id: string) => {
        dispatch(deleteEventType(id))
    }

    const toggleAddNewType = () => {
        if (!showNewInput) {
            dispatch(eventTypesEditAction.updateEditEventId(initial._id))
            dispatch(eventTypesEditAction.updateEventData(initial))
        }
        setShowNewInput((prev) => !prev)
    }

    const addNewType = () => {
        dispatch(addEventType({isDefault: false, name: newData?.name, color: newData?.color})).then(() => {
            clearNewDataState()
            toggleAddNewType()
        })
    }
    if (isLoading) {
        return <PageLoader />
    }

    if (error) {
        return <Box header={t('Управление типами событий')}>
            <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так. Не удалось загрузить типы событий.')} />
        </Box>
    }
  
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <VStack gap='20' align='center' className={classNames(cls.EventTypesEdit, {}, [className])}>
                <h2>{t('Категории событий')}</h2>
                <p>{t('В этом разделе Вы можете добавить свои категории для событий. Например: "учеба", "ребенок", "личное"')}</p>
                <Box header={t('Управление типами событий')}>

                    {data?.map((type: EventType) => {
                        return <EventTypeInput 
                            key={type._id}
                            itemData={type}
                            editInputId={editTypeId}
                            onColorChange={handleChangeColor}
                            onNameChange={handleChangeName}
                            onSave={handleSaveEventType}
                            onEdit={toggleInput}
                            onChancelEdit={handleChancelEdit}
                            onDelete={handleDelete}
                        />
                    })}
                    {showNewInput && <EventTypeInput 
                        itemData={newData}
                        editInputId={editTypeId}
                        onColorChange={handleChangeColor}
                        onNameChange={handleChangeName}
                        onSave={addNewType}
                        onEdit={toggleInput}
                        onChancelEdit={handleChancelEdit}
                    />}
                    {!showNewInput &&
                    <AppButton theme={ButtonTheme.SOLID} className={cls.button} onClick={toggleAddNewType}>{t('Добавить новую категорию')}</AppButton>}
                </Box>
            </VStack>
        </DynamicModuleLoader>
    )
        
})

export default EventTypesEdit