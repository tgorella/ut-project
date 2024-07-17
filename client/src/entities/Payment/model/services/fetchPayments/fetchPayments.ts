import { ThunkConfig } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Payment } from '../../types/Payment'
import i18n from '@/shared/config/i18n/i18n'


export const fetchPayments = createAsyncThunk<Payment[], string, ThunkConfig<string>>(
    'payment/fetchAll',
    // @ts-ignore
    async (queryParams, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI
        try {
            const list = await extra.api.post('/', {
                'query': `query Payments { payments { ${queryParams} }}`,
                'operation-name': 'Payments'
            })
            
            return list.data.data.payments
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попытайтесь позже'))
      
        }
    }
)