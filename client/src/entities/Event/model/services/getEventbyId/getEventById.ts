import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { EventExtended } from '../../types/Event'


export const getEventById = createAsyncThunk<EventExtended, string ,ThunkConfig<string>>(
    'event/getEventById',
    async (eventId, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'query Event($eventId: ID) { event(id: $eventId) { _id endTime eventDate eventType { _id } notes place startTime title } }',
                'operation-name': 'Event',
                'variables': { 'eventId': eventId }
            })
            
            if (!data) {
                throw new Error('err')
            }
            return data.data.event
        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)