import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Project } from '../../types/Project'

export const updateProject = createAsyncThunk<Project, Partial<Project>,ThunkConfig<string>>(
    'project/updateProject',
    async (data, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($data: ProjectNewDataInput) { updateProject(data: $data) { _id name stages { _id name steps { _id name } } } }',
                'operation-name': 'Mutation',
                'variables': {'data': data}
            })

            if (!response) {
                throw new Error('err')
            }
            
            return response.data.data.updateProject
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)