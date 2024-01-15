import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import httpService from 'shared/api/api'
import { Event } from '../../types/Event'
import { getUserAuthData } from 'entities/User'


export const getEventById = createAsyncThunk<Event, string ,ThunkConfig<string>>(
    'event/getEventById',
    async (eventId, thunkAPI) => {
        const {rejectWithValue, getState} = thunkAPI
        try {
            const userData = getUserAuthData(getState())
            const {data} = await httpService.get<Event>(`/event/${eventId}`)
            if (data.userId !== userData?._id) {
                return rejectWithValue(i18n.t('Нет доступа'))
            }
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)