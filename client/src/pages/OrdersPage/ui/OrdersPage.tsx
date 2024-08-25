import cls from './OrdersPage.module.scss'
import {memo, useCallback, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getOrdersPageData } from '../model/selectors/getOrdersPageData/getOrdersPageData'
import { OrderList } from '@/entities/Order'
import { getOrdersPageIsLoading } from '../model/selectors/getOrdersPageLoading/getOrdersPageIsLoading'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ordersPageAction, ordersPageReducer } from '../model/slice/OrdersPageSlice'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchAllOrders } from '../model/services/fetchAllOrders/fetchAllOrders'
import { Box } from '@/shared/ui/Box'
import { HStack } from '@/shared/ui/Stack/HStack/HStack'
import { ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { Searchbar } from '@/widgets/Searchbar'
import { ToggleButtonValue, ToggleButtons } from '@/shared/ui/ToggleButtons'
import { getOrdersPageLimit } from '../model/selectors/getOrdersLimit/getOrdersPageLimit'
import { getOrdersPageSearch } from '../model/selectors/getOrdersPageSearch/getOrdersPageSearch'
import { orderStatusReducer } from '@/entities/OrderStatus'
import { fetchOrderStatuses } from '@/entities/OrderStatus/model/services/fetchOrderStatuses/fetchOrderStatuses'
import { Pagination } from '@/shared/ui/Pagination'
import { AddOrderButton } from '@/widgets/AddOrderButton'
import { VStack } from '@/shared/ui/Stack'

const reducers: ReducersList = {
    ordersPage: ordersPageReducer,
    orderStatuses: orderStatusReducer
}
const OrdersPage = memo(() => {
    const {t} = useTranslation('orders')
    const orders = useSelector(getOrdersPageData)
    const isLoading = useSelector(getOrdersPageIsLoading)
    const dispatch = useAppDispatch()
    const limit = useSelector(getOrdersPageLimit) || 25
    const [page, setPage] = useState(1)
    const search = useSelector(getOrdersPageSearch) || ''

    const limitsValue: ToggleButtonValue[]  = [
        {title: '15', value: 15},
        {title: '25', value: 25},
        {title: '50', value: 50},
        {title: '100', value: 100}
    ]

    const handleChangePage = useCallback((num: number) => setPage(num), [])

    const handleSearch = useCallback((val: string) => {
        dispatch(ordersPageAction.setSearch(val))
    }, [dispatch])

    const handleChangeLimit = useCallback((num: number | string) => {
        dispatch(ordersPageAction.setLimit(Number(num)))
    }, [dispatch])

    const filteredOrders = orders?.slice((page-1)*limit, page*limit)

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(ordersPageAction.initState())
            dispatch(fetchAllOrders({text: search, resParams: 'total title status { _id color name } orderNumber createdAt _id'}))
            dispatch(fetchOrderStatuses())
        }
        
    },[dispatch, search])
    
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true} >
            <VStack max gap='20'>
                <h1 className={cls.header}>{t('Заказы')}</h1>
                <HStack max gap='20' justify='between' align='center' className={cls.top_menu}>
                    <div>
                        <AddOrderButton withClient={true} buttonTheme={ButtonTheme.SOLID}/>
                    </div>
                    <div className={cls.searchBlock}>
                        <Searchbar onChange={handleSearch} placeholder={t('Введите номер заказа или название')} />
                    </div>
                    <div className={cls.toggle_item}>
                        {t('Записей на странице:')} <ToggleButtons onChange={handleChangeLimit} currentValue={limit} values={limitsValue} />
                    </div>
                </HStack>
                <Box className={cls.orders_list}>
                    <OrderList orders={filteredOrders} isLoading={isLoading} />
                </Box>
                <Pagination 
                    itemsLength={orders?.length || 0} 
                    itemsPerPage={limit} 
                    currentPage={page} 
                    onPageChange={handleChangePage }
                    totalItems={!isLoading} 
                    pages={!isLoading} />
            </VStack>
        </DynamicModuleLoader>
        
    )
})

export default OrdersPage