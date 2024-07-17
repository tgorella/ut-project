import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { tokenService } from '@/entities/Token'
import { User, userAction } from '@/entities/User'
import i18n from '@/shared/config/i18n/i18n'

interface loginByEmailProps {
email: string,
password: string
}

export const loginByEmail = createAsyncThunk<User, loginByEmailProps,ThunkConfig<string>>(
    'login/loginByEmail',
    async (authData, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI

        try {

            const reqBody = 
            {
                'query': 'query Query($data: UserSignInInput) { signInWithPassword(data: $data) { accessToken refreshToken userId } }',
                'operationName': 'Query',
                'variables': { 'data': {'password': authData.password,
                    'email': authData.email }}
            }
          
         
            const response = await extra.api.post('/', reqBody)
            if (!response.data) {
                throw new Error('user not found')
            }

            await tokenService.setTokens(response.data.data.signInWithPassword)
            const user = await extra.api.post('/',
                {
                    'query': 'query Query { user { _id avatar city country currency email firstname lastOrderNumber lastname username } }',
                    'operationName': 'Query'
                }
            )
            

            dispatch(userAction.setAuthData(user.data.data.user))

            return user.data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)