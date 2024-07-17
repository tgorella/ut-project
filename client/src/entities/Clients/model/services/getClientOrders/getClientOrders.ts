import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { Order, OrderExtended } from '@/entities/Order'

export const getClientOrders = createAsyncThunk<(Order | OrderExtended)[], string,ThunkConfig<string>>(
    'clientDetails/getClientOrders',
// @ts-ignore
async (clientId, thunkAPI) => {
    const {rejectWithValue, extra} = thunkAPI
    try {
        const {data} = await extra.api.post('/', {
            'query': 'query Query($ordersByClientId: ID) { ordersByClient(id: $ordersByClientId) { _id title status { color name _id} orderNumber createdAt total } }',
            'operation-name': 'Query',
            'variables': {'ordersByClientId': clientId}
               
        })
        if (!data) {
            throw new Error('err')
        }
        return data.data.ordersByClient
    } catch (error) {
        return rejectWithValue(i18n.t('Что-то пошло не так'))
    }
}
)