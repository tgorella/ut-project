import { createAsyncThunk } from '@reduxjs/toolkit'
import { PaymentMethod } from '../../types/PaymentMethod'
import { ThunkConfig } from '@/app/providers/StoreProvider'

export const updatePaymentMethod = createAsyncThunk<PaymentMethod, Partial<PaymentMethod>, ThunkConfig<string>>(
    'paymentMethod/update',
    // @ts-ignore
    async(newData, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation UpdatePaymentMethod($data: PaymentMethodNewDataInput) { updatePaymentMethod(data: $data) { _id name icon_url } }',
                'operation-name': 'UpdatePaymentMethod',
                'variables': {'data': newData}
            })
            if (!data) {
                return rejectWithValue('Метод оплаты не обновлен')
            }
            return data.data.updatePaymentMethod
        } catch (error) {
            return rejectWithValue('Что-то пошло не так. Попробуйте позже')
        }
    }
)