import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { User, userAction } from 'entities/User'
import i18n from 'shared/config/i18n/i18n'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

interface LoginByUsernameProps {
username: string,
password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps,ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.post<User>('/login',authData)
            if (!response.data) {
                throw new Error('user not found')
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
            dispatch(userAction.setAuthData(response.data))
            extra.navigate?.('/about')
            return response.data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)