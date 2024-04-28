import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { EventType } from '../../types/EventType'

export const addEventType = createAsyncThunk<EventType, Partial<EventType>,ThunkConfig<string>>(
    'eventType/add',
    // @ts-ignore
    async (data, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const newType = {
                ...data, isDefault: false
            }
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($data: EventTypeInput) { addEventType(data: $data) { _id color name } }',
                'operation-name': 'Mutation',
                'variables': {'data': newType}
            })
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data.data.addEventType
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)