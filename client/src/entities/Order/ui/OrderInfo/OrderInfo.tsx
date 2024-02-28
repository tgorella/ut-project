import { OrderExtended } from 'entities/Order/model/types/OrderSchema'
import cls from './OrderInfo.module.scss'
import { useTranslation } from 'react-i18next'

interface OrderInfoProps {
  orderInfo: OrderExtended
}
export const OrderInfo = ({ orderInfo }: OrderInfoProps) => {
    const { t } = useTranslation('orders')

    return (
        <>
            <div className={cls.item}>
                <b>{t('Дата')}: </b>
                {orderInfo?.eventDate}
            </div>
            <div className={cls.item}>
                <b>{t('Время')}: </b>
                {orderInfo?.startTime} - {orderInfo?.endTime}
            </div>
            <div className={cls.item}>
                <b>{t('Адрес')}: </b>
                {orderInfo?.place}
            </div>
            <div className={cls.item}>
                <b>{t('Продукт')}: </b>
                {orderInfo.projectType && orderInfo?.projectType.name}
            </div>
        </>
    )
}
