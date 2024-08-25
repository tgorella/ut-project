import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Payment } from '../../types/Payment'

interface newPaymentProps {
  newPaymentData?: Partial<Payment>,
  res?: string
}
export const addPayment = createAsyncThunk<Payment, newPaymentProps, ThunkConfig<string>>(
    'payment/add',
    // @ts-ignore
    async(props, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': `mutation AddPayment($data: PaymentInput) { addPayment(data: $data) { ${props.res} }`,
                'operation-name': 'Mutation',
                'variables': {'data': props.newPaymentData}
            })

            if (!data) {
                return rejectWithValue('Платеж не добавлен')
            }

            return data.data.addPayment
        } catch (error) {
            rejectWithValue('Что-то пошло не так. Попробуйте позже')
        }
    }
)