import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Order } from '../../types/OrderSchema'
import httpService from 'shared/api/api'

export type FilterProps = {
  orderId: string,
  currentUserId: string
}
export const getOrderById = createAsyncThunk<Order, FilterProps ,ThunkConfig<string>>(
    'orderDetails/getOrderById',
    async (filter, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        const {orderId, currentUserId} = filter
        try {
            const {data} = await httpService.get<Order>(`/orders/${orderId}`)
            if (data.userId !== currentUserId) {
                return rejectWithValue(i18n.t('Клиент не найден'))
            }
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)