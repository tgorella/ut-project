import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import {ProjectStep } from '../../types/Project'

export const addStep = createAsyncThunk<ProjectStep, Partial<ProjectStep>,ThunkConfig<string>>(
    'project/addStep',
    async (data, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
        
            const response = await extra.api.post<ProjectStep>('/project-steps/', data)
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)