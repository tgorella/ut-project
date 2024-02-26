import cls from './OrderList.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useCallback, useState} from 'react'
import { Order, OrderExtended } from 'entities/Order/model/types/OrderSchema'
import { Text, TextAlign } from 'shared/ui/Text'
import { useTranslation } from 'react-i18next'
import { Column } from 'shared/ui/Table/model/types/tableSchema'
import { OrderListItem } from '../OrderListItem/OrderListItem'
import { PageLoader } from 'widgets/PageLoader'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { Modal } from 'shared/ui/Modal'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deleteOrder } from 'entities/Order/model/services/deleteOrder/deleteOrder'
import { ordersPageAction } from 'pages/OrdersPage/model/slice/OrdersPageSlice'
import { clientDetailsAction } from 'entities/Clients'

interface OrderListProps {
  className?: string;
  orders?: (OrderExtended | Order)[],
  isLoading?: boolean,
}
export const OrderList = memo(({className, orders = [], isLoading} : OrderListProps) => {
    const [orderId, setOrderId] = useState('')
    const {t} = useTranslation('orders')
    let columns: Column[] = [
        { name: '№', path: 'orderNumber' },
        { name: t('Дата'), path: 'createdAt' },
        { name: t('Заголовок'), path: 'title' },
        { name: t('Стоимость'), path: 'total' },
        { name: t('Статус'), path: 'status' },
        { name: t('Удалить'), path: 'del' },
    ]
    if (window.screen.width <= 740) {
        columns = [
            { name: '№', path: 'orderNumber' },
            { name: t('Дата создания'), path: 'createdAt' },
            { name: t('Заголовок'), path: 'title' },
        ]
    }
    const [openModal, setOpenModal] = useState(false)
    const toggleModal = () => setOpenModal((prev:boolean) => !prev)
    const onDelete = (id: string | undefined) => {
        if (id) {
            setOrderId(id)
        }
        toggleModal()
    }
    
    const dispatch = useAppDispatch()

    const handleDelete = useCallback(() => {
        dispatch(deleteOrder(orderId)).then(() => {
            dispatch(ordersPageAction.orderDeleted(orderId))
            dispatch(clientDetailsAction.orderDeleted(orderId))
            setOpenModal(false)
        })
        

    }, [dispatch, orderId])

    if (isLoading) {
        return <PageLoader />
    }
    if (!orders || orders.length === 0) {
        <div className={classNames(cls.OrderList, {}, [className])}>
            <Text text={t('Заказов нет')} align={TextAlign.CENTER} />
        </div>
    }
    return ( 
        <>
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
                            return <OrderListItem order={order} columns={columns} key={order._id} onDelete={onDelete}/>
                        })
                    }
                </tbody>
            </table>
            <Modal onClose={toggleModal} isOpen={openModal}>
                <Text align={TextAlign.CENTER} title={t('Внимание! Это действие необратимо! Вы точно хотите удалить этот заказ?')} />
                <div className={cls.modal_btns_wrapper}>
                    <AppButton theme={ButtonTheme.OUTLINED} onClick={handleDelete}>{t('Удалить')}</AppButton>
                    <AppButton theme={ButtonTheme.SOLID} onClick={toggleModal}>{t('Отмена')}</AppButton>
                </div>
            </Modal>
        </>
        
    )
})