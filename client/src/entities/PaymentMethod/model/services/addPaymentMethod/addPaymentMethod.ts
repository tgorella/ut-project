import { createAsyncThunk } from '@reduxjs/toolkit'
import { PaymentMethod } from '../../types/PaymentMethod'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'

export const addPaymentMethod = createAsyncThunk<PaymentMethod, Partial<PaymentMethod>, ThunkConfig<string>>(
    'paymentMethod/add',
    // @ts-ignore
    async(newPaymentMethod, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation AddPaymentMethod($data: PaymentMethodInput) { addPaymentMethod(data: $data) { _id name icon_url } }',
                'operation-name': 'AddPaymentMethod',
                'variables': {'data': newPaymentMethod}
            })
            if (!data) {
                return rejectWithValue('Метод оплаты не добавлен')
            }
            return data.data.addPaymentMethod
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)