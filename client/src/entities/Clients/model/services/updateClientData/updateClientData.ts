import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { Client } from '../../types/clientSchema'
import { getClientDetailsForm } from '../../selectors/getClientDetailsForm/getClientDetailsForm'

export const updateClientData = createAsyncThunk<Client, void,ThunkConfig<string>>(
    'clientDetails/updateClientData',
    async (_, thunkAPI) => {
        const {rejectWithValue, getState, extra} = thunkAPI
        const formData = getClientDetailsForm(getState())
        
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation Mutation($data: ClientNewDataInput) { updateClient(data: $data) { _id address avatarUrls email isFav name notes phone profession } }',
                'operationName': 'Mutation',
                'variables': {'data': formData}
            })
            
            if (!data) {
                throw new Error('err')
            }
            
            return data.data.updateClient
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)