import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User, userAction } from 'entities/User'
import i18n from 'shared/config/i18n/i18n'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

interface LoginByUsernameProps {
username: string,
password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {

        try {
            const response = await axios.post<User>('http://localhost:3333/login',authData)
            if (!response.data) {
                throw new Error('user not found')
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
            thunkAPI.dispatch(userAction.setAuthData(response.data))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)