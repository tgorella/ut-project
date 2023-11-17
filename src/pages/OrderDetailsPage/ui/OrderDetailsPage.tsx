import cls from './OrderDetailsPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { OrderCard} from 'entities/Order'
import { useParams } from 'react-router-dom'
import { PageLoader } from 'widgets/PageLoader'
import { useTranslation } from 'react-i18next'
import { getOrderDetailsForm } from 'entities/Order/model/selectors/getOrderDetailsForm/getOrderDetailsForm'
import { useSelector } from 'react-redux'
import { getOrderDetailsIsLoading } from 'entities/Order/model/selectors/getOrderDetailsIsLoading/getOrderDetailsIsLoading'


interface OrderDetailsPageProps {
  className?: string;
}

const OrderDetailsPage = memo(({className} : OrderDetailsPageProps) => {
    const {t} = useTranslation()
    let {id} = useParams()
    const orderData = useSelector(getOrderDetailsForm)
    const isLoading = useSelector(getOrderDetailsIsLoading)

    if (__PROJECT__ === 'storybook') {
        id = '64469ad32e53c6aa4c0746b6'
    }
   
    if (isLoading) {
        return <PageLoader />
    }

    return ( 
        <div className={cls.page_wrapper}>
            <h1 className={cls.title}>{t('Информация о заказе')} #{orderData?.orderNumber}</h1>
            <div className={classNames(cls.OrderDetailsPage, {}, [className])}>
                {id && <OrderCard id={id}/>}
            </div>
        </div>
    )
})

export default OrderDetailsPage