import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import httpService from 'shared/api/api'

export type FilterProps = {
  eventId: string,
}
export const deleteEvent = createAsyncThunk<string, string ,ThunkConfig<string>>(
    'event/deleteEvent',
    async (eventId, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
          
            const {data} = await httpService.delete(`/events/${eventId}`)
            if (!data) {
                throw new Error('err')
            }
            return data

        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)