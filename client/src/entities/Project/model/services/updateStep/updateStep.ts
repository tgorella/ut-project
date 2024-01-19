import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import httpService from 'shared/api/api'
import { ProjectStep } from '../../types/Project'

export const updateStep = createAsyncThunk<ProjectStep, Partial<ProjectStep>,ThunkConfig<string>>(
    'project/updateStep',
    async (data, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const response = await httpService.patch<ProjectStep>('/project-steps/'+ data._id, data)
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)