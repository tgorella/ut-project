import { Order } from 'entities/Order/model/types/OrderSchema'
import cls from './OrderListItem.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { Column } from 'shared/ui/Table/model/types/tableSchema'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface OrderListItemProps {
  className?: string;
  order: Order,
  columns: Column[]
}
export const OrderListItem = ({className, order, columns} : OrderListItemProps) => {
    const navigate = useNavigate()
    const {t} = useTranslation('orders')
    return ( 
        <div className={classNames(cls.OrderListItem, {}, [className])}>
            {columns.map((column) => {
                if (column.path === 'createdAt') {
                    return <div className={cls.item} key={order.id+'_'+column.path} onClick={() => navigate('/orders/' +order.id)}>{order[column.path as keyof Order]}</div>
                }
                if (column.path !== 'del') {
                    return <div  className={cls.item} key={order.id+'_'+column.path} onClick={() => navigate('/orders/' +order.id)}>{order[column.path as keyof Order]}</div>
                } else {
                    return <div  className={cls.item} key={order.id+'_'+column.path}>{t('Del')}</div>
                }
                
            })}
        </div>
    )
}