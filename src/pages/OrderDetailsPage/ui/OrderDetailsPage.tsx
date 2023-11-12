import cls from './OrderDetailsPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { useTranslation } from 'react-i18next'


interface OrderDetailsPageProps {
  className?: string;
}
const OrderDetailsPage = memo(({className} : OrderDetailsPageProps) => {
    const {t} = useTranslation()
    return ( 
        <div className={classNames(cls.OrderDetailsPage, {}, [className])}>
            <h1>{t('Заказ')}</h1>
        </div>
    )
})

export default OrderDetailsPage