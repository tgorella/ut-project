import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile } from '../../types/profileSchema'


export const updateProfilePassword = createAsyncThunk<Profile, string,ThunkConfig<string>>(
    'profile/updateProfilePassword',
    async (pass, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
       
        try {
            
            const {data} = await extra.api.post('/', {
                'query': 'mutation Mutation($pass: String) { updatePass(pass: $pass) }',
                'operation-name': 'Mutation',
                'variables': {'pass': pass}
            })

            if (!data) {
                throw new Error('err')
            }
            return data.data.updatePass
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)