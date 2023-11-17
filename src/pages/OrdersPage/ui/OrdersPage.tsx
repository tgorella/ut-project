import cls from './OrdersPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getOrdersPageData } from '../model/selectors/getOrdersPageData/getOrdersPageData'
import { OrderList } from 'entities/Order'
import { getOrdersPageIsLoading } from '../model/selectors/getOrdersPageLoading/getOrdersPageIsLoading'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ordersPageReducer } from '../model/slice/OrdersPageSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchAllOrders } from '../model/services/fetchAllOrders/fetchAllOrders'
import { Box } from 'shared/ui/Box'

interface OrdersPageProps {
  className?: string;
}

const reducers: ReducersList = {
    ordersPage: ordersPageReducer
}
const OrdersPage = memo(({className} : OrdersPageProps) => {
    const {t} = useTranslation('order-page')
    const orders = useSelector(getOrdersPageData)
    const isLoading = useSelector(getOrdersPageIsLoading)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchAllOrders())
        }
        
    },[dispatch])
    
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false} >
            <div className={classNames(cls.OrdersPage, {}, [className])}>
                <h1>{t('Страница заказов')}</h1>
                <Box>
                    <OrderList orders={orders} isLoading={isLoading} />
                </Box>
                
            </div>
        </DynamicModuleLoader>
        
    )
})

export default OrdersPage