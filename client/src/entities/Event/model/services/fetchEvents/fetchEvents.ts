import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Event } from '../../types/Event'


export const fetchEvents = createAsyncThunk<Event[], void ,ThunkConfig<string>>(
    'event/fetchEvents',
    async (_, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'query Events { events { _id endTime eventDate eventType { _id color name } notes place startTime title } }',
                'operation-name':'Events'
            })
           
            if (!data) {
                throw new Error('err')
            }
            return data.data.events
        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)