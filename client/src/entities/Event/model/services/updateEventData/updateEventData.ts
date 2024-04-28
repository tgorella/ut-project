import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { EventExtended } from '../../types/Event'
import { getEventDetailsForm } from '@/pages/EventDetailPage'


export const updateEventData = createAsyncThunk<EventExtended, string,ThunkConfig<string>>(
    'event/updateEventData',
    async (id, thunkAPI) => {
        const {rejectWithValue,getState, extra} = thunkAPI
        const formData = getEventDetailsForm(getState())
        try {
            const newData = {
                ...formData,
                eventType: formData?.eventType._id,
                _id: id
            }
            const {data} = await extra.api.post('/',
                {
                    'query': 'mutation UpdateEvent($data: EventNewDataInput) { updateEvent(data: $data) { _id endTime eventDate eventType { _id } notes place startTime title } }',
                    'operation-name': 'UpdateEvent',
                    'variables': {'data': newData}
                }
            )

            if (!data) {
                throw new Error('err')
            }
            return data.data.updateEvent
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)