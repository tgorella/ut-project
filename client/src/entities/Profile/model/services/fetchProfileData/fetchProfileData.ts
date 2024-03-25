import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile } from '../../types/profileSchema'


export const fetchProfileData = createAsyncThunk<Profile, void,ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'query Query { user { _id avatar city country currency email firstname lastOrderNumber lastname username roles } }',
                'operationName': 'Query'
            })
            if (!data) {
                throw new Error('err')
            }
            return data.data.user
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)