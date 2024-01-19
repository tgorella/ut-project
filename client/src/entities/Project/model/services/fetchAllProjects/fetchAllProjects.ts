import { createAsyncThunk } from '@reduxjs/toolkit'
import { Project } from '../../types/Project'
import { ThunkConfig } from 'app/providers/StoreProvider'
import httpService from 'shared/api/api'
import i18n from 'shared/config/i18n/i18n'


export const fetchProjects = createAsyncThunk<Project[], void,ThunkConfig<string>>(
    'project/fetchAll',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const list = await httpService.get<Project[]>('/projects/')
          
            if (!list) {
                throw new Error('err')
            }
          
            return list.data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)