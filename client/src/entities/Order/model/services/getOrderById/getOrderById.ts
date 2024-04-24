import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { OrderExtended } from '../../types/OrderSchema'

export type FilterProps = {
  orderId: string,
  currentUserId: string
}
export const getOrderById = createAsyncThunk<OrderExtended, string ,ThunkConfig<string>>(
    'orderDetails/getOrderById',
    async (id, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'query Query($orderId: ID) { order(id: $orderId) { clientId {_id address avatarUrls email isFav name notes phone profession } createdAt endTime eventDate notes orderNumber place projectType { _id name } startTime status { _id color name } title total } }',
                'operation-name': 'Query',
                'variables': {'orderId': id}
            })
            
            if (!data) {
                throw new Error('Заказ не найден')
            }
            return data.data.order
        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)