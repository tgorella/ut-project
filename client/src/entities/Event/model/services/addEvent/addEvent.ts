import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import httpService from 'shared/api/api'
import { getEventFormData } from '../../selectors/getEventFormData/fetEventFormData'

export const addEvent = createAsyncThunk<Event, void,ThunkConfig<string>>(
    'event/add',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, getState} = thunkAPI
        try {
            
            const newEvent = getEventFormData(getState())

            const {data} = await httpService.post<Event>('/events', newEvent)
            
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)