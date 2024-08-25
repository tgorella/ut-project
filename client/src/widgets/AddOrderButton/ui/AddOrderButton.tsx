import cls from './AddOrderButton.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo, useCallback, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AppButton, ButtonSize, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import ADD_ORDER_ICON from '@/shared/assets/img/add_order.svg'
import { addOrderButtonReducer } from '../model/slice/AddOrderButtonSlice'
import { AddOrderForm } from '@/features/AddOrder'
import { clientDetailsAction, getClientDetailsData } from '@/entities/Clients'
import { addOrderAction, addOrderReducer } from '@/features/AddOrder/model/slice/AddOrderSlice'
import { addOrder } from '../model/services/addOrder/addOrder'
import { getAddOrderError } from '../model/selectors/addOrderButton'
import { PreviewWindow } from '@/shared/ui/PreviewWindow'
import {  getAddClientError } from '@/widgets/AddClientButton/module/selectors/addClient/addClient'
import { AddClientForm } from '@/features/AddClient'
import { addClient } from '@/widgets/AddClientButton/module/services/AddClient/addClient'
import { addClientAction, addClientReducer } from '@/features/AddClient/model/slice/AddClientSlice'
import { addClientButtonReducer } from '@/widgets/AddClientButton/module/slice/AddClientButtonSlice'
import { ordersPageAction } from '@/pages/OrdersPage/model/slice/OrdersPageSlice'
import { projectSelectReducer } from '@/entities/Project/ui/ProjectSelect/model/slice/projectSelectSlice'
import { aLertInformerAction } from '@/widgets/ALertInformer'
import { AlertTheme } from '@/shared/ui/Alert'

const reducers: ReducersList = {
    addOrderButton: addOrderButtonReducer,
    addOrder: addOrderReducer,
    ProjectSelect: projectSelectReducer
}
interface AddOrderButtonProps {
  className?: string;
  withClient: boolean;
  buttonTheme: ButtonTheme
}
export const AddOrderButton = memo(({className, withClient = false, buttonTheme} : AddOrderButtonProps) => {
    if (withClient) {
        reducers.addClient = addClientReducer
        reducers.addClientButton = addClientButtonReducer
    }
    const {t} = useTranslation('orders')
    const [openPreview, setOpenPreview] = useState(false)
    const togglePreview = () => setOpenPreview(!openPreview)
    const dispatch = useAppDispatch()
    const newOrderError = useSelector(getAddOrderError) || ''
    const client = useSelector(getClientDetailsData)
    const newClientError = useSelector(getAddClientError) || ''

  
    const handleAddOrder = useCallback(() => {
        if (withClient) {
            dispatch(addClient())
                .then(({payload}) => {
                    const id = Date.now().toString()
                    dispatch(aLertInformerAction.addMessage({
                        message: 'Клиент успешно добавлен',
                        type: AlertTheme.SUCCESS,
                        id: id
                    }))
                    setTimeout(() => {
                        dispatch(aLertInformerAction.removeMessage(id))
                    }, 10000)
                    dispatch(addOrder({
                        isClientPage: !withClient,
                        //@ts-ignore
                        clientId: payload?._id,
                        resData: '_id total title status { _id color name } startTime projectType { _id name } place orderNumber eventDate endTime createdAt '
                    }))
                        .then((data) => {
                            if (data.meta.requestStatus === 'fulfilled' && data.payload !== undefined) {
                                const id = Date.now().toString()
                                dispatch(ordersPageAction.orderAdded(data.payload))
                                dispatch(aLertInformerAction.addMessage({
                                    message: 'Заказ успешно добавлен',
                                    type: AlertTheme.SUCCESS,
                                    id: id
                                }))
                                setTimeout(() => {
                                    dispatch(aLertInformerAction.removeMessage(id))
                                }, 10000)
                            }
                        })
                }).then(() => {
                 
                    dispatch(addClientAction.resetState())
                    dispatch(addOrderAction.resetState())
                })
        } else {
            dispatch(addOrder({
                isClientPage: !withClient
            }))
                .then((data) => {
                    if (data.meta.requestStatus === 'fulfilled' && data.payload !== undefined) {
                      
                        dispatch(ordersPageAction.orderAdded(data.payload))
                        dispatch(clientDetailsAction.orderAdded(data.payload))
                        const id = Date.now().toString()
                        dispatch(aLertInformerAction.addMessage({
                            message: 'Заказ успешно добавлен',
                            type: AlertTheme.SUCCESS,
                            id: id
                        }))
                        setTimeout(() => {
                            dispatch(aLertInformerAction.removeMessage(id))
                        }, 10000)
                    }
                }).then(() => {
                    dispatch(addClientAction.resetState())
                    dispatch(addOrderAction.resetState())
                })
        }
        
    }, [dispatch, withClient])

    useEffect(() => {
        if (!withClient && client ) {
            dispatch(addOrderAction.updateNewOrderData({
                clientId: {_id: client._id}
            }))
        }
    }, [client, dispatch, withClient])
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={classNames(cls.AddOrderButton, {}, [className])}>
                <AppButton 
                    size={ButtonSize.S} 
                    theme={buttonTheme}
                    onClick={togglePreview}
                >
                    <ADD_ORDER_ICON className={cls.icon}/>{t('Добавить заказ')}
                </AppButton>
                <PreviewWindow onClose={togglePreview} isOpen={openPreview}>
                    {withClient &&
                    <AddClientForm
                        onAddClient={() => {}} 
                        withButton={false}
                    />
                    }
                    <AddOrderForm 
                        onAddOrder={() => {}} 
                        withButton={false}
                    />
                    <AppButton 
                        theme={ButtonTheme.OUTLINED} 
                        onClick={handleAddOrder} 
                        disabled={[...Object.values(newOrderError),...Object.values(newClientError)].filter((item) => item !== '').length > 0 ? true : false}
                    >
                        {t('Сохранить')}
                    </AppButton>
                </PreviewWindow>
            </div>
        </DynamicModuleLoader>
    )
})