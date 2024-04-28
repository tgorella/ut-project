/* eslint-disable i18next/no-literal-string */
import cls from './OrderCard.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {ReactNode, memo, useCallback, useEffect, useState} from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getOrderById } from '../../model/services/getOrderById/getOrderById'
import { getUserAuthData } from '@/entities/User'
import { useSelector } from 'react-redux'
import { getOrderDetailsIsLoading } from '../../model/selectors/getOrderDetailsIsLoading/getOrderDetailsIsLoading'
import { getOrderDetailsError } from '../../model/selectors/getOrderDetailsError/getOrderDetailsError'
import { getOrderDetailsForm } from '../../model/selectors/getOrderDetailsForm/getOrderDetailsForm'
import { Box } from '@/shared/ui/Box'
import { EditSwitcher } from '@/widgets/EditeSwitcher'
import { orderDetailsAction, orderDetailsReducer } from '../../model/slice/OrderDetailsSlice'
import { PageLoader } from '@/widgets/PageLoader'
import { Text } from '@/shared/ui/Text'
import { NotFound } from '@/shared/ui/NotFound'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Client } from '@/entities/Clients'
import { NoteBlock } from '@/widgets/NoteBlock'
import { updateOrderData } from '../../model/services/updateOrderData/updateOrderData'
import { OrderForm } from '../OrderForm/OrderForm'
import { OrderStatusBlock, OrderStatusSelect, orderStatusReducer } from '@/entities/OrderStatus'
import { fetchOrderStatuses } from '@/entities/OrderStatus/model/services/fetchOrderStatuses/fetchOrderStatuses'
import { OrderInfo } from '../OrderInfo/OrderInfo'
import { useTranslation } from 'react-i18next'
import { projectSelectReducer } from '@/entities/Project/ui/ProjectSelect/model/slice/projectSelectSlice'
import { getProjectSelectData } from '@/entities/Project/ui/ProjectSelect/model/selectors/getProjectSelectData/getProjectSelectData'
import { fetchProjects } from '@/entities/Project'
import { ClientInfo } from '@/entities/Clients/ui/ClientInfo/ClientInfo'

interface OrderProps {
  className?: string;
  id: string;
  children?: ReactNode
}

const reducers: ReducersList = {
    orderDetails: orderDetailsReducer,
    orderStatuses: orderStatusReducer,
    ProjectSelect: projectSelectReducer

}
export const OrderCard = memo(({className, id, children} : OrderProps) => {
    const {t} = useTranslation('orders')
    const dispatch = useAppDispatch()
    const authData = useSelector(getUserAuthData)
    const data = useSelector(getOrderDetailsForm)
    const isLoading = useSelector(getOrderDetailsIsLoading)
    const error = useSelector(getOrderDetailsError)
    const projects = useSelector(getProjectSelectData) || []
    const [statusEdit, setStatusEdit] = useState(false)
    const [edit, setEdit] = useState(false)
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
                dispatch(getOrderById(id))
                dispatch(fetchOrderStatuses())
                dispatch(fetchProjects())
            }
        }
    }, [authData, dispatch, id])
    
    const projectNames: {[key: string]: string} = {}
    if (projects.length !== 0) {
        projects.forEach((project) => {
            projectNames[project._id] = project.name
        })
    }

    const toggleStatusEditMode = useCallback(() => setStatusEdit(!statusEdit) , [statusEdit])
    const toggleEditMode = useCallback(() =>setEdit(!edit), [edit])
    const handleCancelEdit = () => {
        dispatch(orderDetailsAction.cancelEdit())
        toggleEditMode()
    }
    const handleChancelNoteEdit = useCallback(() => {
        dispatch(orderDetailsAction.cancelEdit())
    }, [dispatch])

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
        dispatch(orderDetailsAction.updateOrder({eventDate: value}))
    }, [dispatch])

    const handleChangePlace = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({place: value}))
    }, [dispatch])

    const handleChangeProjectType = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({projectType: {_id:value}}))
    }, [dispatch])

    const handleChangeTotal = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({total: value}))
    }, [dispatch])

    const handleChangeTitle = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({title: value}))
    }, [dispatch])

    const handleChangeStatus = useCallback((value: string) => {
        dispatch(orderDetailsAction.updateOrder({
            status: {
                _id: value}}))
        dispatch(updateOrderData(id))
        toggleStatusEditMode()
    }, [dispatch, id, toggleStatusEditMode])

    const handleSaveOrder = useCallback(() => {
        dispatch(updateOrderData(id)).then(() => toggleEditMode())
    }, [dispatch, id, toggleEditMode])

    const handleSaveNotes = useCallback(() => {
        dispatch(updateOrderData(id))
    }, [dispatch, id])

    let content 

    if (isLoading || !data) {
        content = <PageLoader />
    }
    
    else if (error) {
        content = <NotFound />
    }
    else {
        content = <>
            <div className={cls.status}>
                {!statusEdit && <>{t('Статус')}: <OrderStatusBlock status={data?.status}/></>}
                {statusEdit && data.status && <OrderStatusSelect onChange={handleChangeStatus} value={data?.status?._id}/>}
                <EditSwitcher  editMode={statusEdit} onEdit={toggleStatusEditMode} onCancelEdit={toggleStatusEditMode} className={cls.status_edit_btn}/>
            </div>
            <div className={classNames(cls.OrderDetailsPage, {}, [className])}>
                <div className={cls.small_column} >
                    {children}
                    <Box>
                        <ClientInfo data={data?.clientId as Client} />
                    </Box>
                </div>
                <div className={cls.big_column}>
                    <Box 
                        className={classNames(cls.Order, {}, [className])}
                        header={data?.title}
                        footer={<Text title={t('Стоимость')+': '+data?.total} />}>
                        <EditSwitcher  editMode={edit} onEdit={toggleEditMode} onCancelEdit={handleCancelEdit}  className={cls.edit_btn}/>
                        {!edit && <OrderInfo orderInfo={data} />}
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
                    <NoteBlock value={data?.notes} onCancelEdit={handleChancelNoteEdit} onChange={handleNoteEdit} onSave={handleSaveNotes} />
                </div>
            </div>
        </>
        
    }
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            {content}
        </DynamicModuleLoader>
        
    )
})