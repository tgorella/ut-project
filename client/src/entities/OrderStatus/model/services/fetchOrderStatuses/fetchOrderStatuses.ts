import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import { OrderStatusDetails } from '../../types/OrderStatus'

export const fetchOrderStatuses = createAsyncThunk<OrderStatusDetails[], void,ThunkConfig<string>>(
    'orderStatus/fetchAll',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, extra, getState} = thunkAPI
        try {
            const authData = getUserAuthData(getState())
            const defaultStatuses = await extra.api.get<OrderStatusDetails[]>('/orderStatuses?isDefault=true')
            const userStatuses = await extra.api.get<OrderStatusDetails[]>(`/orderStatuses?userId=${authData?.id}`)
            if (!defaultStatuses && !userStatuses) {
                throw new Error('err')
            }
            return [...defaultStatuses.data, ...userStatuses.data]
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)