import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { OrderStatusDetails } from '../../types/OrderStatus'

export const fetchOrderStatuses = createAsyncThunk<OrderStatusDetails[], void,ThunkConfig<string>>(
    'orderStatus/fetchAll',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const list = await extra.api.get<OrderStatusDetails[]>('/order-statuses')
            
            if (!list) {
                throw new Error('err')
            }
            
            return list.data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)