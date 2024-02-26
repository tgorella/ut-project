import { createAsyncThunk } from '@reduxjs/toolkit'
import { Project } from '../../types/Project'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'


export const fetchProjects = createAsyncThunk<Project[], void,ThunkConfig<string>>(
    'project/fetchAll',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const list = await extra.api.post('/', {
                'query': 'query Query { projects { _id name stages { _id name projectId steps  { _id name } } } }',
                'operation-name': 'Query',
             
            })
          
            if (!list) {
                throw new Error('err')
            }
          
            return list.data.data.projects
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)