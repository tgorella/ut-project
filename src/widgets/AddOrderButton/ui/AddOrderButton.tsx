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
import { getClientDetailsData } from 'entities/Clients'
import { addOrderAction, addOrderReducer } from 'features/AddOrder/model/slice/AddOrderSlice'
import { addOrder } from '../model/services/addOrder/addOrder'
import { getAddOrderAddedStatus, getAddOrderError } from '../model/selectors/addOrderButton'

const reducers: ReducersList = {
    addOrderButton: addOrderButtonReducer,
    addOrder: addOrderReducer
}
interface AddOrderButtonProps {
  className?: string;
  withClient: boolean
}
export const AddOrderButton = memo(({className, withClient = false} : AddOrderButtonProps) => {
    const {t} = useTranslation('orders')
    const [openPreview, setOpenPreview] = useState(false)
    const togglePreview = () => setOpenPreview(!openPreview)
    const dispatch = useAppDispatch()
    const added = useSelector(getAddOrderAddedStatus)
    const newClientError = useSelector(getAddOrderError)
    const client = useSelector(getClientDetailsData)
  
    const handleAddOrder = useCallback((newOrder) => {
        dispatch(addOrder({
            newOrder: newOrder,
            isClientPage: !withClient
        }))
    }, [dispatch, withClient])

    useEffect(() => {
        if (!withClient && client ) {
            dispatch(addOrderAction.updateNewOrderData({
                clientId: client.id
            }))
        }
    }, [client, dispatch, withClient])
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={classNames(cls.AddClientButton, {}, [className])}>
                <AppButton 
                    size={ButtonSize.S} 
                    theme={ButtonTheme.SOLID}
                    onClick={togglePreview}
                >
                    <ADD_ORDER_ICON className={cls.icon}/>{t('Добавить заказ')}
                </AppButton>
                <AddOrderForm 
                    onClose={togglePreview} 
                    isOpen={openPreview} 
                    onAddOrder={handleAddOrder} 
                    added={added} 
                    error={newClientError}
                    withClient={false}
                />
            </div>
        </DynamicModuleLoader>
    )
})