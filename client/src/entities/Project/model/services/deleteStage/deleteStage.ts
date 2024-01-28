import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import httpService from 'shared/api/api'

export const deleteProjectStage = createAsyncThunk<{stage: string, project: string}, string,ThunkConfig<string>>(
    'project/deleteStage',
    async (projectStageId, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const response = await httpService.delete<{stage: string, project: string}>('/project-stages/'+ projectStageId)
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)