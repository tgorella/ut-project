import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile } from '../../types/profileSchema'
import { getUserAuthData } from 'entities/User'


export const updateProfilePassword = createAsyncThunk<Profile, string,ThunkConfig<string>>(
    'profile/updateProfilePassword',
    async (pass, thunkAPI) => {
        const {rejectWithValue, getState, extra} = thunkAPI
        try {
            const userData = getUserAuthData(getState())
            const {data} = await extra.api.patch<Profile>('users/updatePassword/'+userData?._id, {password: pass})

            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)