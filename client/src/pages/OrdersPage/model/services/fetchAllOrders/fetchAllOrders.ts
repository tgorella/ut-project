import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Order, OrderExtended } from 'entities/Order'

interface FetchProps {
  text: string,
  resParams: string
}
export const fetchAllOrders = createAsyncThunk<(OrderExtended | Order)[], FetchProps,ThunkConfig<string>>(
    'ordersPage/fetchAllOrders',
// @ts-ignore
async (props, thunkAPI) => {
    const {rejectWithValue, extra} = thunkAPI
    try {
        const {data} = await extra.api.post('/', {
            'query': `query Query($data: String) { filteredOrders(data: $data) { ${props.resParams} } }`,
            'operation-name': 'Query',
            'variables': {'data': props.text}
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