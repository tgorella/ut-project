import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { OrderStatusDetails } from '../../types/OrderStatus'

export const updateStatus = createAsyncThunk<OrderStatusDetails, Partial<OrderStatusDetails>,ThunkConfig<string>>(
    'orderStatus/update',
    // @ts-ignore
    async (data, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($data: OrderStatusNewDataInput) { updateOrderStatus(data: $data) { color name _id } }',
                'operation-name': 'Mutation',
                'variables': {'data': data}
            })
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data.data.updateOrderStatus
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)