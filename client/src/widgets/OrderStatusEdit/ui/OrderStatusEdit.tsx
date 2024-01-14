import cls from './OrderStatusEdit.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useEffect, useState} from 'react'
import { OrderStatusDetails, OrderStatusInput, addOrderStatus, deleteStatus, fetchOrderStatuses, updateStatus} from 'entities/OrderStatus'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Box } from 'shared/ui/Box'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { PageLoader } from 'widgets/PageLoader'
import { getOrderStatusEditError } from '../model/selectors/getOrderStatusEditError/getOrderStatusEditError'
import { getOrderStatusEditIsLoading } from '../model/selectors/getOrderStatusEditisLoading/getOrderStatusEditisLoading'
import { getOrderStatusEditData } from '../model/selectors/getOrderStatusEditData/getOrderStatusEditData'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { orderStatusEditAction, orderStatusEditReducer } from '../model/slice/OrderStatusEditSlice'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { getOrderStatusEdiNewStatusData } from '../model/selectors/getOrderStatusEditNewStatusData/getOrderStatusEditNewStatusData'
import { getOrderStatusEditId } from '../model/selectors/getOrderStatusEditId/getOrderStatusEditId'

interface OrderStatusEditProps {
  className?: string;
}

const initalState = {
    isDefault: false,
    name: '',
    color: '#000000',
    _id: 'new'
}

const reducers : ReducersList = {
    OrderStatusEditSchema: orderStatusEditReducer
}

export const OrderStatusEdit = memo(({className} : OrderStatusEditProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation('orders')
    const editInputId = useSelector(getOrderStatusEditId) || ''
    const newData = useSelector(getOrderStatusEdiNewStatusData) || initalState
    const data = useSelector(getOrderStatusEditData)
    const isLoading = useSelector(getOrderStatusEditIsLoading)
    const error = useSelector(getOrderStatusEditError)
   
    const [showNewInput, setShowNewInput] = useState(false)

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchOrderStatuses())
        }
    }, [dispatch])

    const toggleInput = (id: string, name: string, color: string) => {
       
        dispatch(orderStatusEditAction.updateStatusId(id))
        dispatch(orderStatusEditAction.updateStatusData({ name: name, color: color, _id: id }))
    }

    const handleChancelEdit = () => {
        dispatch(orderStatusEditAction.clearStatusId())
        dispatch(orderStatusEditAction.clearStatusData())
        setShowNewInput(false)
    }

    const handleChangeName = (value: string) => {
        dispatch(orderStatusEditAction.updateStatusData({name: value} ))
    }

    const handleChangeColor = (value: string) => {
        dispatch(orderStatusEditAction.updateStatusData({color: value} ))
    }

    const handleSaveStatus = () => {
        dispatch(updateStatus({...newData, _id: editInputId})).then(() => {
            dispatch(orderStatusEditAction.clearStatusId())
            dispatch(orderStatusEditAction.clearStatusData())
        })
    }
    const handleDelete = (id: string) => {
        dispatch(deleteStatus(id))
    }

    const toggleAddNewStatus = () => {
        if (!showNewInput) {
            dispatch(orderStatusEditAction.updateStatusId(initalState._id))
            dispatch(orderStatusEditAction.updateStatusData(initalState))
        }
        setShowNewInput((prev) => !prev)
        
    }


    const addNewStatus = () => {
        dispatch(addOrderStatus({isDefault: newData.isDefault, name: newData.name, color: newData.color})).then(() => {
            dispatch(orderStatusEditAction.clearStatusId())
            dispatch(orderStatusEditAction.clearStatusData())
            toggleAddNewStatus()
        })
    }

    const handleChangeNewOrderStatusName = (val: string) => {
        dispatch(orderStatusEditAction.updateStatusData({name: val} ))
    }

    const handleChangeNewOrderStatusColor = (val: string) => {
        dispatch(orderStatusEditAction.updateStatusData({color: val} ))
    }

    if (isLoading) {
        return <PageLoader />
    }
    
    if (error) {
        return <Box header={t('Управление статусами заказов')}>
            <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так. Не удалось загрузить статусы.')} />
        </Box>
    }
    return ( 
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.OrderStatusEdit, {}, [className])}>
                <Box header={t('Управление статусами заказов')}>
                    <p>{t('В этот разделе Вы можете добавить свои статусы к заказам. Например: "В ожидании оплаты". Или же если Вы часть работы над проектом делигируете членам команды, то можно создать статус с именем человека, кому поручено выполнение работы (например: "менеджер Мария").')}</p>

                    <p>{t('Статусы "Новый", "Завершен", "Отменен" и "Архив" - это статусы по умолчанию, удалить или изменить их нельзя. Они необходимы для корректной работы приложения.')}</p>
                    {data?.map((item: OrderStatusDetails) => {
                        return <OrderStatusInput 
                            key={item._id}
                            itemData={item} 
                            editInputId={editInputId} 
                            onColorChange={handleChangeColor} 
                            onNameChange={handleChangeName} 
                            onSave={handleSaveStatus} 
                            onEdit={toggleInput} 
                            onChancelEdit={handleChancelEdit} 
                            onDelete={handleDelete}  />
                    })}
                    {showNewInput && <OrderStatusInput  
                        itemData={newData}
                        editInputId={editInputId} 
                        onColorChange={handleChangeNewOrderStatusColor} 
                        onNameChange={handleChangeNewOrderStatusName} 
                        onSave={addNewStatus} 
                        onEdit={toggleInput} 
                        onChancelEdit={handleChancelEdit} 
                    />}
                    {!showNewInput  &&
                    <AppButton theme={ButtonTheme.SOLID} className={cls.button} onClick={toggleAddNewStatus}>{t('Добавить новый статус')}</AppButton>}
                </Box>
            </div>
        </DynamicModuleLoader>
    )
})