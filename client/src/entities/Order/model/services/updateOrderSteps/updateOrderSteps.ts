import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { Order } from '../../types/OrderSchema'

interface newStepData {
_id?: string,
steps: string[]
}

export const updateOrderSteps = createAsyncThunk<Order, newStepData,ThunkConfig<string>>(
    'orderDetails/updateOrderSteps',
    async (newData, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation Mutation($data: OrderNewDataInput) { updateOrder(data: $data) { total title notes eventDate endTime startTime place } }',
                'operation-name':'Mutation',
                'variables': {'data': newData}
            })

            if (!data) {
                throw new Error('err')
            }
            return data.data.updateOrder
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)