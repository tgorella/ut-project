import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import { Order } from 'entities/Order'


export type filterData = {
  userId: string,
  page?: string,
  limit?: string
}
export const fetchAllOrders = createAsyncThunk<Order[], void,ThunkConfig<string>>(
    'ordersPage/fetchAllOrders',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, extra, getState} = thunkAPI
        try {
            const authData = getUserAuthData(getState())
            const {data} = await extra.api.get<Order[]>(`/orders?userId=${authData?.id}`)
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)