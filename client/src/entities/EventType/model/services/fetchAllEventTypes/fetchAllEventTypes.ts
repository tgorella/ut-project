import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { EventType } from '../../types/EventType'

export const fetchEventTypes = createAsyncThunk<EventType[], void,ThunkConfig<string>>(
    'eventTypes/fetchAll',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const list = await extra.api.get<EventType[]>('/event-types/')
            
            if (!list) {
                throw new Error('err')
            }
            
            return list.data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)