import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { OrderExtended } from '../../types/OrderSchema'

interface FetchProps {
  text: string,
  resParams: string
}
export const fetchOrders = createAsyncThunk<OrderExtended[], FetchProps,ThunkConfig<string>>(
    'ordersPage/fetchOrders',
    // @ts-ignore
    async (props, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': `query Query { orders { ${props.resParams} } }`,
                'operation-name': 'Query'
            })
        
            if (!data) {
                return rejectWithValue(i18n.t('Заказы не найдены'))
            }
            return data.data.orders
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)