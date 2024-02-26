import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'

export const deleteProjectStage = createAsyncThunk<{stage: string, project: string}, string,ThunkConfig<string>>(
    'project/deleteStage',
    async (projectStageId, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($deleteProjectStageId: ID) { deleteProjectStage(id: $deleteProjectStageId) { project stage } }',
                'operation-name': 'Mutation',
                'variables': {'deleteProjectStageId': projectStageId}
            })
            
            if (!response) {
                throw new Error('err')
            }
            
            return response.data.data.deleteProjectStage
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)