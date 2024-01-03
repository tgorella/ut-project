import { useEffect } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getClientOrders } from '../../model/services/getClientOrders/getClientOrders'
import { useSelector } from 'react-redux'
import { OrderList } from 'entities/Order'
import { getClientOrdersData } from '../../model/selectors/getClientOrdersData/getClientOrdersData'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { clientDetailsReducer } from 'entities/Clients/model/slice/clientDetailsSlice'
import { orderStatusReducer } from 'entities/OrderStatus'
import { fetchOrderStatuses } from 'entities/OrderStatus/model/services/fetchOrderStatuses/fetchOrderStatuses'
import { Box } from 'shared/ui/Box'
import { useTranslation } from 'react-i18next'
import { getClientOrdersLoading } from 'entities/Clients/model/selectors/getClientOrdersLoading/getClientOrdersLoading'
import { PageLoader } from 'widgets/PageLoader'

const reducers: ReducersList = {
    clientDetails: clientDetailsReducer,
    orderStatuses: orderStatusReducer
}
interface ClientOrdersListProps {
  className?: string;
  clientId: string
}
export const ClientOrdersList = ({className, clientId} : ClientOrdersListProps) => {

    const orders = useSelector(getClientOrdersData)
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const isLoading = useSelector(getClientOrdersLoading)

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(getClientOrders(clientId))
            dispatch(fetchOrderStatuses())
        }
    }, [clientId, dispatch])

    
    if (isLoading) {
        return <PageLoader />
    }

    return ( 
        <DynamicModuleLoader reducers={reducers}>
          
            <Box header={t('Заказы')}>
                {orders?.length === 0 && <p>{t('Заказов нет')}</p>}
                {orders && orders?.length > 0 && <OrderList orders={orders} className={className} />}
               
            </Box>
          
        </DynamicModuleLoader>
        
    )
}