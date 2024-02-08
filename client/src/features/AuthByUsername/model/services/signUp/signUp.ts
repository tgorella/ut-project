import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { tokenService } from 'entities/Token'
import { User, userAction } from 'entities/User'
import i18n from 'shared/config/i18n/i18n'

interface signUpProps {
email: string,
password: string
}

export const signUp = createAsyncThunk<User, signUpProps,ThunkConfig<string>>(
    'login/signUp',
    async (newUserData, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI

        try {
            const response = await extra.api.post('/auth/signUp',newUserData)
            if (!response.data) {
                throw new Error('user not found')
            }

            tokenService.setTokens(response.data)
            const user = await extra.api.get('/users/'+ response.data.userId)

            dispatch(userAction.setAuthData(user.data))

            return user.data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)