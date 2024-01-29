import cls from './AddOrderButton.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useCallback, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AppButton, ButtonSize, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import ADD_ORDER_ICON from 'shared/assets/img/add_order.svg'
import { addOrderButtonReducer } from '../model/slice/AddOrderButtonSlice'
import { AddOrderForm } from 'features/AddOrder'
import { clientDetailsAction, getClientDetailsData } from 'entities/Clients'
import { addOrderAction, addOrderReducer } from 'features/AddOrder/model/slice/AddOrderSlice'
import { addOrder } from '../model/services/addOrder/addOrder'
import { getAddOrderAddedStatus, getAddOrderError } from '../model/selectors/addOrderButton'
import { PreviewWindow } from 'shared/ui/PreviewWindow'
import { getAddClientAddedStatus, getAddClientError } from 'widgets/AddClientButton/module/selectors/addClient/addClient'
import { AddClientForm } from 'features/AddClient'
import { addClient } from 'widgets/AddClientButton/module/services/AddClient/addClient'
import { addClientAction, addClientReducer } from 'features/AddClient/model/slice/AddClientSlice'
import { addClientButtonReducer } from 'widgets/AddClientButton/module/slice/AddClientButtonSlice'
import { ordersPageAction } from 'pages/OrdersPage/model/slice/OrdersPageSlice'
import { projectSelectReducer } from 'entities/Project/ui/ProjectSelect/model/slice/projectSelectSlice'

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
    const added = useSelector(getAddOrderAddedStatus)
    const newOrderError = useSelector(getAddOrderError) || ''
    const client = useSelector(getClientDetailsData)
    const clientAdded = useSelector(getAddClientAddedStatus)
    const newClientError = useSelector(getAddClientError) || ''
  
    const handleAddOrder = useCallback(() => {
        if (withClient) {
            dispatch(addClient())
                .then(({payload}) => {
                    dispatch(addOrder({
                        isClientPage: !withClient,
                        //@ts-ignore
                        clientId: payload?._id
                    }))
                        .then((data) => {
                            if (data.meta.requestStatus === 'fulfilled' && data.payload !== undefined) {
                                dispatch(ordersPageAction.orderAdded(data.payload))
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
                clientId: client._id
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
                        added={clientAdded} 
                        error={newClientError}
                        withButton={false}
                    />
                    }
                    <AddOrderForm 
                        onAddOrder={() => {}} 
                        added={added} 
                        error={newOrderError}
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