import { Order } from 'entities/Order/model/types/OrderSchema'
import cls from './OrderListItem.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { Column } from 'shared/ui/Table/model/types/tableSchema'
import { useNavigate } from 'react-router-dom'
import { OrderStatusBlock } from 'entities/OrderStatus'
import DELETE_ICON from 'shared/assets/img/delete.svg'
import { transformDate } from 'shared/lib/transformDate/transformDate'

interface OrderListItemProps {
  className?: string;
  order: Order,
  columns: Column[],
  onDelete: (id: string) => void
}
export const OrderListItem = ({className, order, columns, onDelete} : OrderListItemProps) => {
    const navigate = useNavigate()
    const data = transformDate(order.createdAt)

    function generateItemCode (column: Column) {
        let itemClass
        let itemContent
        let onClick

        switch (column.path) {
        case 'orderNumber':
            itemClass = cls.number
            itemContent = order[column.path as keyof Order]
            onClick = () => navigate('/orders/' +order.id)
            break
        case 'del':
            itemClass = cls.del
            itemContent = <DELETE_ICON className={cls.icon}/>
            onClick = () => onDelete(order.id)
            break
        case 'createdAt':
            itemClass = cls.date
            itemContent = data
            onClick = () => navigate('/orders/' +order.id)
            break
        case 'total':
            itemClass = cls.date
            itemContent = order[column.path as keyof Order]
            onClick = () => navigate('/orders/' +order.id)
            break
        case 'status':
            itemClass = cls.status
            itemContent = <OrderStatusBlock id={order.status}/>
            onClick = () => navigate('/orders/' +order.id)
            break
        default:
            itemClass = cls.item
            itemContent = order[column.path as keyof Order]
            onClick = () => navigate('/orders/' +order.id)
            break
        }

        return <td className={itemClass} key={order.id+'_'+column.path} onClick={onClick}>{itemContent}</td>
    }
    
    return ( 
        <tr className={classNames(cls.OrderListItem, {}, [className])}>
            {columns.map((column) => {
                return generateItemCode(column)
            })}
        </tr>
    )
}