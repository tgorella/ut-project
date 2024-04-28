import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { Project } from '../../types/Project'

export const addProject = createAsyncThunk<Project, Partial<Project>,ThunkConfig<string>>(
    'project/add',
    async (data, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
          
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($data: ProjectInput) { addProject(data: $data) { _id name stages { name _id projectId} userId } }',
                'operation-name': 'Mutation',
                'variables': {'data': data}
            })
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data.data.addProject
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)