import { Order, OrderExtended } from 'entities/Order/model/types/OrderSchema'
import cls from './OrderListItem.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { Column } from 'shared/ui/Table/model/types/tableSchema'
import { useNavigate } from 'react-router-dom'
import DELETE_ICON from 'shared/assets/img/delete.svg'
import { transformDate } from 'shared/lib/transformDate/transformDate'
import { useTranslation } from 'react-i18next'

interface OrderListItemProps {
  className?: string;
  order: OrderExtended | Order,
  columns: Column[],
  onDelete: (id: string | undefined) => void
}
export const OrderListItem = ({className, order, columns, onDelete} : OrderListItemProps) => {
    const navigate = useNavigate()
    const {t} = useTranslation()
    let data: string
    
    if (order.createdAt) {
        data =  transformDate(new Date(Number(order.createdAt)).toISOString())
    }
    // @ts-ignore
    const statusBlock = order.status?.color 
    // @ts-ignore
        ? (<div className={cls.OrderStatus} style={{backgroundColor: order.status.color}}>{order.status.name}</div>) 
        : (<div className={cls.OrderStatus} >{t('Новый')}</div>)
    function generateItemCode (column: Column) {
        let itemClass
        let itemContent
        let onClick

        switch (column.path) {
        case 'orderNumber':
            itemClass = cls.number
            itemContent = order[column.path as keyof Order]
            onClick = () => navigate('/orders/' +order._id)
            break
        case 'del':
            itemClass = cls.del
            itemContent = <DELETE_ICON className={cls.icon}/>
            onClick = () => onDelete(order._id)
            break
        case 'createdAt':
            itemClass = cls.date
            itemContent = data
            onClick = () => navigate('/orders/' + order._id)
            break
        case 'total':
            itemClass = cls.date
            itemContent = order[column.path as keyof Order]
            onClick = () => navigate('/orders/' + order._id)
            break
        case 'status':
            itemClass = cls.status
            // @ts-ignore
            itemContent = statusBlock
            onClick = () => navigate('/orders/' + order._id)
            break
        default:
            itemClass = cls.item
            itemContent = order[column.path as keyof Order]
            onClick = () => navigate('/orders/' + order._id)
            break
        }

        return <td className={itemClass} key={order._id + '_' + column.path} onClick={onClick}>{itemContent}</td>
    }
    
    return ( 
        <tr className={classNames(cls.OrderListItem, {}, [className])}>
            {columns.map((column) => {
                return generateItemCode(column)
            })}
        </tr>
    )
}