/* eslint-disable i18next/no-literal-string */
import cls from './OrderCard.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useCallback, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getOrderById } from '../../model/services/getOrderById/getOrderById'
import { getUserAuthData } from 'entities/User'
import { useSelector } from 'react-redux'
import { getOrderDetailsIsLoading } from '../../model/selectors/getOrderDetailsIsLoading/getOrderDetailsIsLoading'
import { getOrderDetailsError } from '../../model/selectors/getOrderDetailsError/getOrderDetailsError'
import { getOrderDetailsForm } from '../../model/selectors/getOrderDetailsForm/getOrderDetailsForm'
import { Box } from 'shared/ui/Box'
import { EditSwitcher } from 'widgets/EditeSwitcher'
import { orderDetailsAction, orderDetailsReducer } from '../../model/slice/OrderDetailsSlice'
import { PageLoader } from 'widgets/PageLoader'
import { Text } from 'shared/ui/Text'
import { NotFound } from 'shared/ui/NotFound'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ClientCard } from 'entities/Clients'
import { NoteBlock } from 'widgets/NoteBlock'
import { updateOrderData } from '../../model/services/updateOrderData/updateOrderData'
import { OrderForm } from '../OrderForm/OrderForm'

interface OrderProps {
  className?: string;
  id: string
}

const reducers: ReducersList = {
    orderDetails: orderDetailsReducer
}
export const OrderCard = memo(({className, id} : OrderProps) => {
    const {t} = useTranslation('orders')
    const dispatch = useAppDispatch()
    const authData = useSelector(getUserAuthData)
    const data = useSelector(getOrderDetailsForm)
    const isLoading = useSelector(getOrderDetailsIsLoading)
    const error = useSelector(getOrderDetailsError)
    const [edit, setEdit] = useState(false)
    const [editNotes, setEditNotes] = useState(false)
    const [errors] = useState({
        title:'',
        place: '',
        total: '',
        startTime: '',
        endTime: '',
        projectType: '',

    })

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            if (authData) {
                dispatch(getOrderById({orderId: id, currentUserId: authData.id}))
            }
        }
    }, [authData, dispatch, id])

    const toggleEditMode = useCallback(() =>setEdit(!edit), [edit])
    const handleChancelEdit = () => {
        dispatch(orderDetailsAction.chancelEdit())
        toggleEditMode()
    }
    const toggleNoteEditMode = useCallback(() => setEditNotes(!editNotes), [editNotes])
    const handleChancelNoteEdit = useCallback(() => {
        dispatch(orderDetailsAction.chancelEdit())
        toggleNoteEditMode()
    }, [dispatch, toggleNoteEditMode])

    const handleSaveNotes = useCallback(() => {
        dispatch(updateOrderData(id)).then(() => toggleNoteEditMode())

    }, [dispatch, id, toggleNoteEditMode])

    const handleNoteEdit = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({notes: value}))
    }, [dispatch])

    const handleChangeEndTime = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({endTime: value}))
    }, [dispatch])

    const handleChangeStartTime = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({startTime: value}))
    }, [dispatch])

    const handleChangeEventDate = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({eventDay: value}))
    }, [dispatch])

    const handleChangePlace = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({place: value}))
    }, [dispatch])

    const handleChangeProjectType = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({projectType: value}))
    }, [dispatch])

    const handleChangeTotal = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({total: value}))
    }, [dispatch])

    const handleChangeTitle = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({title: value}))
    }, [dispatch])

    const handleSaveOrder = useCallback(() => {
        dispatch(updateOrderData(id)).then(() => toggleEditMode())
    }, [dispatch, id, toggleEditMode])

    let content 
    if (isLoading || !data) {
        content = <PageLoader />
    }
    
    else if (error) {
        content = <NotFound />
    }
    else {
        content = <div className={classNames(cls.OrderDetailsPage, {}, [className])}>
            <div className={cls.small_column} >
                <ClientCard id={data?.clientId} onlyRead={true} withNotes={false} />
            </div>
            <div className={cls.big_column}>
                <Box 
                    className={classNames(cls.Order, {}, [className])}
                    header={data?.title}
                    footer={<Text title={'Стоимость: '+data?.total} />}
                >
                    <EditSwitcher  editMode={edit} onEdit={toggleEditMode} onChancelEdit={handleChancelEdit}  className={cls.edit_btn}/>
                    {!edit && <>
                        <div className={cls.item}>
                            <b>{t('Дата')}: </b>{data?.eventDate}
                        </div>
                        <div className={cls.item}>
                            <b>{t('Время')}: </b>{data?.startTime} - {data?.endTime}
                        </div>
                        <div className={cls.item}>
                            <b>{t('Адрес')}: </b>{data?.place}
                        </div>
                        <div className={cls.item}>
                            <b>{t('Продукт')}: </b>{data?.projectType}
                        </div>
                    </>}
                    {edit && <OrderForm  
                        data={data}
                        errors={errors}
                        onChangeEndTime={handleChangeEndTime}
                        onChangeEventDate={handleChangeEventDate}
                        onChangePlace={handleChangePlace}
                        onChangeProjectType={handleChangeProjectType}
                        onChangeStartTime={handleChangeStartTime}
                        onChangeTitle={handleChangeTitle}
                        onChangeTotal={handleChangeTotal}
                        OnSaveOrder={handleSaveOrder}
                    
                    />}
                    
                </Box>
                <NoteBlock value={data?.notes} onChancelEdit={handleChancelNoteEdit} onChange={handleNoteEdit} onSave={handleSaveNotes} />
            </div>
        </div>
    }
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            {content}
        </DynamicModuleLoader>
        
    )
})