import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile } from '../../types/profileSchema'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { getUserAuthData } from 'entities/User'


export const updateProfileData = createAsyncThunk<Profile, void,ThunkConfig<string>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const {rejectWithValue, getState, extra} = thunkAPI
        const formData = getProfileForm(getState())
        try {
            const userData = getUserAuthData(getState())
            const {data} = await extra.api.patch<Profile>('/users/'+userData?._id, formData)

            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)