import cls from './OrdersPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { useTranslation } from 'react-i18next'

interface OrdersPageProps {
  className?: string;
}
const OrdersPage = memo(({className} : OrdersPageProps) => {
    const {t} = useTranslation('order-page')
    return ( 
        <div className={classNames(cls.OrdersPage, {}, [className])}>
            <h1>{t('Страница заказов')}</h1>
        </div>
    )
})

export default OrdersPage