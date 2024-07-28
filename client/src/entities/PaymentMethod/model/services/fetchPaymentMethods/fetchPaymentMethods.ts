import { createAsyncThunk } from '@reduxjs/toolkit'
import { PaymentMethod } from '../../types/PaymentMethod'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'

export const fetchPaymentMethods = createAsyncThunk<PaymentMethod[], void, ThunkConfig<string>>(
    'paymentMethod/fetchAll',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const list = await extra.api.post('/', {
                'query': 'query PaymentMethods { paymentMethods { _id name icon_url } }',
                'operation-name': 'PaymentMethods'
            })
      
            if (!list) {
                throw new Error('err')
            }
      
            return list.data.data.paymentMethods
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)