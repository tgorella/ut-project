import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import httpService from 'shared/api/api'

export const deleteStatus = createAsyncThunk<string, string,ThunkConfig<string>>(
    'orderStatus/delete',
    // @ts-ignore
    async (orderStatusId, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const response = await httpService.delete<string>('/order-status/'+ orderStatusId)
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)