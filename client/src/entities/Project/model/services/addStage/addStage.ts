import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import httpService from 'shared/api/api'
import {ProjectStage } from '../../types/Project'

export const addStage = createAsyncThunk<ProjectStage, Partial<ProjectStage>,ThunkConfig<string>>(
    'project/addStage',
    async (data, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
        
            const response = await httpService.post<ProjectStage>('/project-stages/', data)
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)