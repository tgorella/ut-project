import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'

export const deleteProject = createAsyncThunk<string, string,ThunkConfig<string>>(
    'project/deleteProject',
    async (projectId, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($deleteProjectId: ID) { deleteProject(id: $deleteProjectId) }',
                'project-name': 'Mutation',
                'variables': {'deleteProjectId': projectId}
            })
            
            if (!response) {
                throw new Error('err')
            }
           
            return response.data.data.deleteProject
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)