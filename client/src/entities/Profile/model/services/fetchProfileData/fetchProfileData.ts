import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile } from '../../types/profileSchema'
import httpService from 'shared/api/api'


export const fetchProfileData = createAsyncThunk<Profile, string,ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (userId, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const {data} = await httpService.get<Profile>(`/users/${userId}`)
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)