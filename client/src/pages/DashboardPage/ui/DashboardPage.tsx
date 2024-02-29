import cls from './DashboardPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getProfileData, profileReducer } from 'entities/Profile'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import greeting from 'shared/lib/greeting/greeting'
import randomSentence from 'shared/lib/randomSentence/randomSentence'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Order, OrderExtended } from 'entities/Order'
import { getOrdersPageData } from 'pages/OrdersPage/model/selectors/getOrdersPageData/getOrdersPageData'
import { ordersPageReducer } from 'pages/OrdersPage/model/slice/OrdersPageSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchAllOrders } from 'pages/OrdersPage/model/services/fetchAllOrders/fetchAllOrders'
import { Box } from 'shared/ui/Box'
import { Vstack } from 'shared/ui/Vstack/Vstack'

interface DashboardPageProps {
  className?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
    ordersPage: ordersPageReducer
}
const DashboardPage = memo(({className} : DashboardPageProps) => {
    const dispatch = useAppDispatch()
    const userInfo = useSelector(getProfileData)
    const orders = useSelector(getOrdersPageData)

    useEffect(() => {
        dispatch(fetchAllOrders({text: '', resParams: '_id total createdAt'}))
    }, [dispatch])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )
    
   
    
    function Chart() {

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: false,
                },
            },
        }

        const labels = [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ]
        if (orders) {
            const filteredOrders = (monthNumber: number) => {
                return orders.filter(
                    (i: Order | OrderExtended) => Number((new Date(Number(i.createdAt)).toISOString()).split('T')[0].split('-')[1]) === monthNumber
                )
            }
    
            const money = (array: (OrderExtended | Order)[]) => {
                return array.reduce((acc, item) => acc + Number(item.total), 0)
            }
    
            const data = {
                labels,
                datasets: [
                    {
                        label: 'Прибыль',
                        data: labels.map((i, index) => money(filteredOrders(index + 1))),
                        borderColor: '#ff9800',
                        backgroundColor: '#ff9800'
                    },
                ],
            }
    
            // eslint-disable-next-line i18next/no-literal-string
            return <Line options={options} data={data} updateMode="resize"  />
        }
    }

    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <Vstack className={classNames(cls.DashboardPage, {}, [className])}>
                <p className={cls.greeting}>{greeting()+ ', ' + userInfo?.firstname + ' '+ userInfo?.lastname}</p>
                <p className={cls.sentence}>{randomSentence}</p>
                <Box>
                    {orders && Chart()}
                </Box>
                
                    
            </Vstack>
        </DynamicModuleLoader>
    )
})

export default DashboardPage