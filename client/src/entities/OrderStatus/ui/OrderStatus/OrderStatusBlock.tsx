import cls from './OrderStatus.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { useSelector } from 'react-redux'
import { getOrderStatusById } from '../../model/selectors/getOrderStatusById/getOrderStatusById'
import { useTranslation } from 'react-i18next'

interface OrderStatusProps {
  className?: string;
  id: string
}
export const OrderStatusBlock = memo(({className, id} : OrderStatusProps) => {
    const {t} = useTranslation('orders')
    const status = useSelector(getOrderStatusById(id))

    if (!status) {
        return <>{t('Loading...')}</>
    }
    return ( 
        <span className={classNames(cls.OrderStatus, {}, [className])} style={{backgroundColor: status.color}}>
            {status.name}
        </span>
    )
})