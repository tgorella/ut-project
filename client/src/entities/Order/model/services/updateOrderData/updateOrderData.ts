import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Order } from '../../types/OrderSchema'
import { getOrderDetailsForm } from '../../selectors/getOrderDetailsForm/getOrderDetailsForm'
import httpService from 'shared/api/api'


export const updateOrderData = createAsyncThunk<Order, string,ThunkConfig<string>>(
    'orderDetails/updateOrderData',
    async (id, thunkAPI) => {
        const {rejectWithValue,getState} = thunkAPI
        const formData = getOrderDetailsForm(getState())
        try {
          
            const {data} = await httpService.patch<Order>(`/order/${id}`, formData)

            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)