import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getEventDetailsForm } from 'pages/EventDetailPage'
import { getUserAuthData } from 'entities/User'

export const addEvent = createAsyncThunk<Event, void,ThunkConfig<string>>(
    'event/add',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, getState, extra} = thunkAPI
        try {
            
            const newEvent = getEventDetailsForm(getState())
            const userData = getUserAuthData(getState())
            const event = {
                ...newEvent,
                userId: userData?._id
            }
            delete event._id
            const {data} = await extra.api.post<Event>('/events', event)
            
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)