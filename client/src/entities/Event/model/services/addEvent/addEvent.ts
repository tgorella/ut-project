import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { getEventDetailsForm } from '@/pages/EventDetailPage'

export const addEvent = createAsyncThunk<Event, void,ThunkConfig<string>>(
    'event/add',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, getState, extra} = thunkAPI
        try {
            
            const newEvent = getEventDetailsForm(getState())
            const event = {
                ...newEvent,
                eventType: newEvent?.eventType._id
            }
            delete event._id
            const {data} = await extra.api.post('/',{
                'query': 'mutation AddEvent($data: EventInput) { addEvent(data: $data) { _id endTime eventDate eventType { _id color } notes place startTime title } }',
                'operation-name': 'AddEvent',
                'variables': {'data': event}
            })
            
            if (!data) {
                throw new Error('err')
            }
            return data.data.addEvent
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)