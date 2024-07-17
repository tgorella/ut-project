import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { FileSchema } from '../../types/File'

export const getFileUrlById = createAsyncThunk<FileSchema, string, ThunkConfig<string>>(
    'file/get',
    async (fileId, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'query Query($id: String) { getFileUrlById(url: $url) { _id url userId } }',
                'operation-name': 'Query',
                'variables': {'id': fileId}
            })
    
            if (!response) {
                throw new Error('err')
            }
    
            return response.data.data.getFileUrlById
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    }
)