import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { FileSchema } from '../../types/File'

export const deleteFileUrl = createAsyncThunk<FileSchema, string, ThunkConfig<string>>(
    'file/delete',
    async (id, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post('/', {
                'query': 'mutation Mutation($id: String) { deleteFileUrl(url: $url) { _id url userId } }',
                'operation-name': 'Mutation',
                'variables': {'id': id}
            })
    
            if (!response) {
                throw new Error('err')
            }
    
            return response.data.data.deleteFileUrl
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так. Попробуйте позже'))
        }
    } 
)