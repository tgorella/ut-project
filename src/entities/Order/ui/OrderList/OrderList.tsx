import cls from './OrderList.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useCallback} from 'react'
import { Order } from 'entities/Order/model/types/OrderSchema'
import { Text, TextAlign } from 'shared/ui/Text'
import { useTranslation } from 'react-i18next'
import { Column } from 'shared/ui/Table/model/types/tableSchema'
import { OrderListItem } from '../OrderListItem/OrderListItem'
import { PageLoader } from 'widgets/PageLoader'

interface OrderListProps {
  className?: string;
  orders?: Order[],
  isLoading?: boolean,
}
export const OrderList = memo(({className, orders = [], isLoading} : OrderListProps) => {

    const {t} = useTranslation('orders')
    let columns: Column[] = [
        { name: '№', path: 'orderNumber' },
        { name: 'Дата', path: 'createdAt' },
        { name: 'Заголовок', path: 'title' },
        { name: 'Стоимость', path: 'total' },
        { name: 'Статус', path: 'status' },
        { name: 'Удалить', path: 'del' },
    ]
    if (window.screen.width <= 740) {
        columns = [
            { name: '№', path: 'orderNumber' },
            { name: 'Дата создания', path: 'createdAt' },
            { name: 'Заголовок', path: 'title' },
        ]
    }

    const handleDelete = useCallback((id: string) => {
        console.log(id)
    }, [])

    if (isLoading) {
        return <PageLoader />
    }
    if (!orders || orders.length === 0) {
        <div className={classNames(cls.OrderList, {}, [className])}>
            <Text text={t('Заказов нет')} align={TextAlign.CENTER} />
        </div>
    }
    return ( 
        <table className={classNames(cls.OrderList, {}, [className])} style={{gridTemplateColumns: `repeat(${columns.length}, calc((100% - 50px) / ${columns.length})) 50px`}}>
            <thead>
                <tr>
                    {columns.map((column) => {
                        return <th key={column.path}>{column.name}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((order) => {
                        return <OrderListItem order={order} columns={columns} key={order.id} onDelete={handleDelete}/>
                    })
                }
            </tbody>
        </table>
        
    )
})