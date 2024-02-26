import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { ProjectStage } from '../../types/Project'

export const updateStage = createAsyncThunk<ProjectStage, Partial<ProjectStage>,ThunkConfig<string>>(
    'project/updateStage',
    async (data, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($data: ProjectStageNewDataInput) { updateProjectStage(data: $data) { _id index name projectId steps {_id name} } }',
                'operation-name': 'Mutation',
                'variables': {'data': data}
            })

            if (!response) {
                throw new Error('err')
            }
            
            return response.data.data.updateProjectStage
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)