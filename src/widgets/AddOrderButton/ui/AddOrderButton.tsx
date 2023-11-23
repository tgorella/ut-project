import cls from './AddOrderButton.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useCallback, useState} from 'react'
import { AddClientForm } from 'features/AddClient'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AppButton, ButtonSize, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { getAddClientAddedStatus, getAddClientError } from 'widgets/AddClientButton/module/selectors/addClient/addClient'
import { addClient } from 'widgets/AddClientButton/module/services/AddClient/addClient'
import ADD_ORDER_ICON from 'shared/assets/img/add_order.svg'
import { addOrderButtonReducer } from '../model/slice/AddOrderButtonSlice'

const reducers: ReducersList = {
    addOrderButton: addOrderButtonReducer
}
interface AddOrderButtonProps {
  className?: string;
}
export const AddOrderButton = memo(({className} : AddOrderButtonProps) => {
    const {t} = useTranslation('orders')
    const [openPreview, setOpenPreview] = useState(false)
    const togglePreview = () => setOpenPreview(!openPreview)
    const dispatch = useAppDispatch()
    const added = useSelector(getAddClientAddedStatus)
    const newClientError = useSelector(getAddClientError)
  
    const handleAddClient = useCallback((newClient) => {
        dispatch(addClient(newClient))
    }, [dispatch])

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
                <AddClientForm 
                    onClose={togglePreview} 
                    isOpen={openPreview} 
                    onAddClient={handleAddClient} 
                    added={added} 
                    error={newClientError}/>
            </div>
        </DynamicModuleLoader>
    )
})