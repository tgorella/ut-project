import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import httpService from 'shared/api/api'
import { Event } from '../../types/Event'

export type FilterProps = {
  eventId: string,
}
export const deleteEvent = createAsyncThunk<Event, string ,ThunkConfig<string>>(
    'event/deleteEvent',
    async (eventId, thunkAPI) => {
        const {rejectWithValue, getState} = thunkAPI
        const userData = getUserAuthData(getState())
        try {
            const {data} = await httpService.get<Event>(`/event/${eventId}`)
            if (data.userId !== userData?._id) {
                throw new Error('Нет доступа')
            }
            if (!data) {
                throw new Error('err')
            }
            const response = await httpService.delete(`/event/${eventId}`)
            return response.data

        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)