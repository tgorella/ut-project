import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { EventType } from '../../types/EventType'

export const updateEventType = createAsyncThunk<EventType, Partial<EventType>,ThunkConfig<string>>(
    'eventType/update',
    // @ts-ignore
    async (data, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($data: EventTypeNewDataInput) { updateEventType(data: $data) { _id color name } }',
                'operation-name': 'Mutation',
                'variables': {'data': data}
            })
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data.data.updateEventType
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)