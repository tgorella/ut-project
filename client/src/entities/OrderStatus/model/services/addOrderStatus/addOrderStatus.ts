import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { OrderStatusDetails } from '../../types/OrderStatus'
import httpService from 'shared/api/api'

export const addOrderStatus = createAsyncThunk<OrderStatusDetails, Partial<OrderStatusDetails>,ThunkConfig<string>>(
    'orderStatus/add',
    // @ts-ignore
    async (data, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const newStatus = {
                ...data, isDefault: false
            }
            const response = await httpService.post<OrderStatusDetails>('/order-status/', newStatus)
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)