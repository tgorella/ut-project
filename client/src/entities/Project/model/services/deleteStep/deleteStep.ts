import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'

export const deleteProjectStep = createAsyncThunk<{step: string, stage: string, project: string}, string,ThunkConfig<string>>(
    'project/deleteStep',
    async (projectStepId, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($deleteProjectStepId: ID) { deleteProjectStep(id: $deleteProjectStepId) { project stage step } }',
                'operation-name': 'Mutation',
                'variables': {'deleteProjectStepId': projectStepId}
            })

            if (!response) {
                throw new Error('err')
            }
            
            return response.data.data.deleteProjectStep
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)