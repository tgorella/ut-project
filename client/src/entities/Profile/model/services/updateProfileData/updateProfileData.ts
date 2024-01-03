import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile } from '../../types/profileSchema'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'


export const updateProfileData = createAsyncThunk<Profile, void,ThunkConfig<string>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const {rejectWithValue, extra, getState} = thunkAPI
        const formData = getProfileForm(getState())
        try {
          
            const {data} = await extra.api.put<Profile>('/profile', formData)

            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)