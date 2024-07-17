import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { ProjectStep } from '../../types/Project'

export const updateStep = createAsyncThunk<ProjectStep, Partial<ProjectStep>,ThunkConfig<string>>(
    'project/updateStep',
    async (data, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($data: ProjectStepNewDataInput) { updateProjectStep(data: $data) { _id name index projectId stageId } }',
                'operation-name': 'Mutation',
                'variables': {'data': data}
            })
            if (!response) {
                throw new Error('err')
            }
            
            return response.data.data.updateProjectStep
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)