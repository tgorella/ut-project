import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { Payment } from '../../types/Payment'

interface UpdatePaymentProps {
  id: string,
  data: Partial<Payment>
}

export const updatePayment = createAsyncThunk<Payment, UpdatePaymentProps,ThunkConfig<string>>(
    'payment/update',
    async (props, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {

            const newData = {
                ...props.data,
                _id: props.id
            }

            const list = await extra.api.post('/', {
                'query': 'mutation UpdatePayment($data: PaymentNewDataInput) { updatePayment(data: $data)  { _id number date method { name icon_url } order { orderNumber _id } userId amount notes  }',
                'operation-name':'UpdatePayment',
                'variables': {'data': newData}
            })

            if (!list.data) {
                throw new Error('err')
            }
            return list.data.data.updatePayment
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте еще раз'))
        }
    }
)