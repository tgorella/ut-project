import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import httpService from 'shared/api/api'

export const deleteProject = createAsyncThunk<string, string,ThunkConfig<string>>(
    'project/deleteProject',
    async (eventTypeId, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const response = await httpService.delete<string>('/projects/'+ eventTypeId)
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)