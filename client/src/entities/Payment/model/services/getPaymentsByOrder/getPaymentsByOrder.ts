import { ThunkConfig } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Payment } from '../../types/Payment'
import i18n from '@/shared/config/i18n/i18n'

interface FetchProps {
  orderId: string,
  resParams: string
}
export const getPaymentsByOrder = createAsyncThunk<Payment[], FetchProps, ThunkConfig<string>>(
    'payment/getPaymentsByOrderId',
    // @ts-ignore
    async (props, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI
        try {
            const list = await extra.api.post('/', {
                'query': `query PaymentsByOrder($paymentsByOrderId: ID) {
  paymentsByOrder(id: $paymentsByOrderId) { ${props.resParams} }}`,
                'operation-name': 'PaymentsByOrder',
                'variables': {'paymentsByOrderId': props.orderId}
            })
            return list.data.data.paymentsByOrder
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попытайтесь позже'))
      
        }
    }
)
