import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'

export const deleteStatus = createAsyncThunk<string, string,ThunkConfig<string>>(
    'orderStatus/delete',
    // @ts-ignore
    async (orderStatusId, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($deleteOrderStatusId: ID) { deleteOrderStatus(id: $deleteOrderStatusId) }',
                'operation-name': 'Mutation',
                'variables': {'deleteOrderStatusId': orderStatusId}
            })
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data.data.deleteOrderStatus
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)