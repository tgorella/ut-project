import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'

export type FilterProps = {
  eventId: string,
}
export const deleteEvent = createAsyncThunk<string, string ,ThunkConfig<string>>(
    'event/deleteEvent',
    async (eventId, thunkAPI ) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
          
            const {data} = await extra.api.post('/', {
                'query': 'mutation DeleteEvent($deleteEventId: ID) { deleteEvent(id: $deleteEventId) }',
                'operation-name': 'DeleteEvent',
                'variables': {'deleteEventId': eventId}
            })
            if (!data) {
                throw new Error('err')
            }
            return data.data.deleteEvent

        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)