import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Order } from '../../types/OrderSchema'
import { ordersPageAction } from 'pages/OrdersPage/model/slice/OrdersPageSlice'


export type FilterProps = {
  orderId: string,
}
export const deleteOrder = createAsyncThunk<Order, string ,ThunkConfig<string>>(
    'orderDetails/deleteOrder',
    async (orderId, thunkAPI) => {
        const {rejectWithValue, dispatch, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation DeleteOrder($deleteOrderId: ID) { deleteOrder(id: $deleteOrderId) }',
                'operation-name': 'DeleteOrder',
                'variables': {
                    'deleteOrderId': orderId
                }
            })

            if (!data) {
                throw new Error('err')
            }

            dispatch(ordersPageAction.orderDeleted(orderId))
            return data.data.deleteOrder

        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)