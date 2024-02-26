import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Order, OrderExtended } from 'entities/Order'

export const fetchAllOrders = createAsyncThunk<(OrderExtended | Order)[], string,ThunkConfig<string>>(
    'ordersPage/fetchAllOrders',
// @ts-ignore
async (text, thunkAPI) => {
    const {rejectWithValue, extra} = thunkAPI
    try {
        const {data} = await extra.api.post('/', {
            'query': 'query Query($data: String) { filteredOrders(data: $data) { total title status { _id color name } orderNumber createdAt _id } }',
            'operation-name': 'Query',
            'variables': {'data': text}
        })
        
        if (!data) {
            return rejectWithValue(i18n.t('Заказы не найдены'))
        }
        return data.data.filteredOrders
    } catch (error) {
        return rejectWithValue(i18n.t('Неправильные логин или пароль'))
    }
}
)