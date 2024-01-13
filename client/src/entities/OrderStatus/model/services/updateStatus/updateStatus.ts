import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { OrderStatusDetails } from '../../types/OrderStatus'
import httpService from 'shared/api/api'

export const updateStatus = createAsyncThunk<OrderStatusDetails, Partial<OrderStatusDetails>,ThunkConfig<string>>(
    'orderStatus/update',
    // @ts-ignore
    async (data, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const response = await httpService.patch<OrderStatusDetails>('/order-status/'+ data._id, data)
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)