import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import { Order } from '../../types/OrderSchema'
import { ordersPageAction } from 'pages/OrdersPage/model/slice/OrdersPageSlice'
import httpService from 'shared/api/api'

export type FilterProps = {
  orderId: string,
}
export const deleteOrder = createAsyncThunk<Order, string ,ThunkConfig<string>>(
    'orderDetails/deleteOrder',
    async (orderId, thunkAPI) => {
        const {rejectWithValue, getState, dispatch} = thunkAPI
        const userData = getUserAuthData(getState())
        try {
            const {data} = await httpService.get<Order>(`/order/${orderId}`)
            if (data.userId !== userData?._id) {
                throw new Error('Нет доступа')
            }
            if (!data) {
                throw new Error('err')
            }
            const response = await httpService.delete(`/order/${orderId}`)
            dispatch(ordersPageAction.orderDeleted(orderId))
            return response.data

        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)