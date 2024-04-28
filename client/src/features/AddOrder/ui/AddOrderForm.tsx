import { Alert, AlertTheme } from '@/shared/ui/Alert'
import { PageLoader } from '@/widgets/PageLoader'
import cls from './AddOrderForm.module.scss'
import { OrderExtended, OrderForm } from '@/entities/Order'
import { useCallback, useState } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text } from '@/shared/ui/Text'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getNewOrderData } from '../model/selectors/getNewOrderData/getNewOrderData'
import { addOrderAction } from '../model/slice/AddOrderSlice'

interface AddOrderFormProps {
  onAddOrder: (newOrder: OrderExtended) => void;
  added?: boolean,
  error?: string,
  withButton: boolean
}
export const AddOrderForm = ({onAddOrder, added, error, withButton} : AddOrderFormProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation('orders')
    const [errors] = useState({
        clientId: '',
        total: '',
        eventDate: '',
        eventType: '',
        place: '',
        startTime: '',
        endTime: '',
        title: '',
        projectType: '',
    })
    const data = useSelector(getNewOrderData)

    const handleChangeTitle = useCallback((value: string) => {
        dispatch(addOrderAction.updateNewOrderData({
            title: value
        }))
    }, [dispatch])

    const handleChangeEventDate = useCallback((value: string) => {
        dispatch(addOrderAction.updateNewOrderData({
            eventDate: value
        }))
    }, [dispatch])

    const handleChangePlace = useCallback((value: string) => {
        dispatch(addOrderAction.updateNewOrderData({
            place: value
        }))
    }, [dispatch])

    const handleChangeStartTime = useCallback((value: string) => {
        dispatch(addOrderAction.updateNewOrderData({
            startTime: value
        }))
    }, [dispatch])

    const handleChangeEndTime = useCallback((value: string) => {
        dispatch(addOrderAction.updateNewOrderData({
            endTime: value
        }))
    }, [dispatch])

    const handleChangeProjectType = useCallback((value: string) => {
        dispatch(addOrderAction.updateNewOrderData({
            projectType: {_id: value,
                name: '',
                userId:'',
                stages: []}
        }))
    }, [dispatch])

    const handleChangeTotal = useCallback((value: string) => {
        dispatch(addOrderAction.updateNewOrderData({
            total: value
        }))
    }, [dispatch])

    const handleAddOrder = () => {
        if (data) {
            onAddOrder(data)
            dispatch(addOrderAction.resetState())
        }
    }
    return ( 
        <div>
            <Text title={t('Добавить новый заказ')} />
            <div className={cls.info_container}>
                {added && <Alert theme={AlertTheme.SUCCESS} text={t('Заказ успешно добавлен')} />}
                {error && <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так... Заказ не добавлен')} />}
                {data === undefined 
                    ? <PageLoader />
                    :(<>
                        <OrderForm 
                            data={data}
                            errors={errors} 
                            withButton={withButton}
                            onChangeTitle={handleChangeTitle} 
                            onChangeEventDate={handleChangeEventDate} 
                            onChangePlace={handleChangePlace} 
                            onChangeStartTime={handleChangeStartTime} 
                            onChangeEndTime={handleChangeEndTime} 
                            onChangeProjectType={handleChangeProjectType} 
                            onChangeTotal={handleChangeTotal} 
                            OnSaveOrder={handleAddOrder}                            
                        />
                    </>)}
            </div>
        </div>
    )
}