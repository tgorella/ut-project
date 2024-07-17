import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'


export const deletePayment = createAsyncThunk<string, string ,ThunkConfig<string>>(
    'payment/delete',
    async (paymentId, thunkAPI) => {
        const {rejectWithValue,extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation DeletePayment($deletePaymentId: ID) { deletePayment(id: $deletePaymentId) }',
                'operation-name': 'DeletePayment',
                'variables': {
                    'deletePaymentId': paymentId
                }
            })

            if (!data) {
                throw new Error('err')
            }

            return data.data.deletePayment

        } catch (error) {
            return rejectWithValue(i18n.t('Платеж не найден'))
        }
    }
)