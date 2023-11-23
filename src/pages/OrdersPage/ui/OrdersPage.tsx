import cls from './OrdersPage.module.scss'
import {memo, useCallback, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getOrdersPageData } from '../model/selectors/getOrdersPageData/getOrdersPageData'
import { OrderList } from 'entities/Order'
import { getOrdersPageIsLoading } from '../model/selectors/getOrdersPageLoading/getOrdersPageIsLoading'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ordersPageAction, ordersPageReducer } from '../model/slice/OrdersPageSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchAllOrders } from '../model/services/fetchAllOrders/fetchAllOrders'
import { Box } from 'shared/ui/Box'
import { HStack } from 'shared/ui/HStack/HStack'
import { AppButton, ButtonSize, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { Searchbar } from 'widgets/Searchbar'
import { ToggleButtonValue, ToggleButtons } from 'shared/ui/ToggleButtons'
import { getOrdersPageLimit } from '../model/selectors/getOrdersLimit/getOrdersPageLimit'
import { getOrdersPageSearch } from '../model/selectors/getOrdersPageSearch/getOrdersPageSearch'
import { orderStatusReducer } from 'entities/OrderStatus'
import { fetchOrderStatuses } from 'entities/OrderStatus/model/services/fetchOrderStatuses/fetchOrderStatuses'

// interface OrdersPageProps {
//   className?: string;
// }

const reducers: ReducersList = {
    ordersPage: ordersPageReducer,
    orderStatuses: orderStatusReducer
}
const OrdersPage = memo(() => {
    const {t} = useTranslation('order-page')
    const orders = useSelector(getOrdersPageData)
    const isLoading = useSelector(getOrdersPageIsLoading)
    const dispatch = useAppDispatch()
    const limit = useSelector(getOrdersPageLimit) || 25
    const [openPreview, setOpenPreview] = useState(false)
    const search = useSelector(getOrdersPageSearch) || ''

    const togglePreviewWindow = () => setOpenPreview(!openPreview)
    const limitsValue: ToggleButtonValue[]  = [
        {title: '15', value: 15},
        {title: '25', value: 25},
        {title: '50', value: 50},
        {title: '100', value: 100}
    ]

    const handleSearch = useCallback((val: string) => {
        dispatch(ordersPageAction.setSearch(val))
    }, [dispatch])

    const handleChangeLimit = useCallback((num: number | string) => {
        dispatch(ordersPageAction.setLimit(Number(num)))
    }, [dispatch])

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchAllOrders(search))
            dispatch(fetchOrderStatuses())
        }
        
    },[dispatch, search])
    
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false} >
            <h1 className={cls.header}>{t('Заказы')}</h1>
            <HStack className={cls.top_menu}>
                <AppButton 
                    size={ButtonSize.S} 
                    theme={ButtonTheme.SOLID}
                    onClick={togglePreviewWindow}
                >
                    {t('Добавить заказ')}
                </AppButton>
                <div className={cls.searchBlock}>
                    <Searchbar onChange={handleSearch} placeholder={t('Введите номер заказа или название')} />
                </div>
                <div className={cls.toggle_item}>
                    {t('Записей на странице:')} <ToggleButtons onChange={handleChangeLimit} currentValue={limit} values={limitsValue} />
                </div>
            </HStack>
            <Box>
                <OrderList orders={orders} isLoading={isLoading} />
            </Box>
                
        </DynamicModuleLoader>
        
    )
})

export default OrdersPage