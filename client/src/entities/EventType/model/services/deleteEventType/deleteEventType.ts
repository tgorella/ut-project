import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'

export const deleteEventType = createAsyncThunk<string, string,ThunkConfig<string>>(
    'eventType/delete',
    // @ts-ignore
    async (eventTypeId, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($deleteEventTypeId: ID) { deleteEventType(id: $deleteEventTypeId) }',
                'operation-name': 'Mutation',
                'variables': {'deleteEventTypeId': eventTypeId}
            })
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data.data.deleteEventType
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)