import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import httpService from 'shared/api/api'
import { EventType } from '../../types/EventType'

export const addEventType = createAsyncThunk<EventType, Partial<EventType>,ThunkConfig<string>>(
    'eventType/add',
    // @ts-ignore
    async (data, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const newType = {
                ...data, isDefault: false
            }
            const response = await httpService.post<EventType>('/event-types/', newType)
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)