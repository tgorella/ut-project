import { ThunkConfig } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const deletePaymentMethod = createAsyncThunk<string, string, ThunkConfig<string>>(
    'paymentMethod/delete',
    async(id, thunkAPI) => {
        const {extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation DeletePaymentMethod($deletePaymentMethodId: ID) { deletePaymentMethod(id: $deletePaymentMethodId) }',
                'operation-name': 'DeletePaymentMethod',
                'variables': {'deletePaymentMethodId': id}
            })
            if (!data.data.deletePaymentMethod) {
                return 'Что-то пошло не так. Метод оплаты не был удален'
            }
            return data.data.deletePaymentMethod
        } catch (error) {
            return 'Что-то пошло не так. Попробуйте позже'
        }
    }
)