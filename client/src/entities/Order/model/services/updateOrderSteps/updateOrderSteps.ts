import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
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
            const {data} = await extra.api.patch<Order>(`/orders/${newData._id}`, newData)

            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)