import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import httpService from 'shared/api/api'
import { Event } from '../../types/Event'
import { getEventDetailsForm } from 'pages/EventDetailPage'


export const updateEventData = createAsyncThunk<Event, string,ThunkConfig<string>>(
    'event/updateEventData',
    async (id, thunkAPI) => {
        const {rejectWithValue,getState} = thunkAPI
        const formData = getEventDetailsForm(getState())
        try {
          
            const {data} = await httpService.patch<Event>(`/events/${id}`, formData)

            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)