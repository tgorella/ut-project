import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { OrderExtended } from '../../types/OrderSchema'

export type FilterProps = {
  orderId: string,
  currentUserId: string
}
export const getOrderById = createAsyncThunk<OrderExtended, FilterProps ,ThunkConfig<string>>(
    'orderDetails/getOrderById',
    async (filter, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        const {orderId} = filter
        try {
            const {data} = await extra.api.post('/', {
                'query': 'query Query($orderId: ID) { order(id: $orderId) { clientId {_id address avatarUrls email isFav name notes phone profession } createdAt endTime eventDate notes orderNumber place projectType { _id name } startTime status { _id color name } title total } }',
                'operation-name': 'Query',
                'variables': {'orderId': orderId}
            })
            
            if (!data) {
                throw new Error('err')
            }
            return data.data.order
        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)