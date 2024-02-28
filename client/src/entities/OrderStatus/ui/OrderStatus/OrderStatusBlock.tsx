import cls from './OrderStatus.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { useTranslation } from 'react-i18next'
import { OrderStatusDetails } from 'entities/OrderStatus/model/types/OrderStatus'

interface OrderStatusProps {
  className?: string;
  status?: OrderStatusDetails
}
export const OrderStatusBlock = memo(({className, status} : OrderStatusProps) => {
    const {t} = useTranslation('orders')

    if (!status) {
        return <>{t('Loading...')}</>
    }
    return ( 
        <span className={classNames(cls.OrderStatus, {}, [className])} style={{backgroundColor: status.color}}>
            {status.name}
        </span>
    )
})