import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { tokenService } from '@/entities/Token'
import { User, userAction } from '@/entities/User'
import i18n from '@/shared/config/i18n/i18n'

interface signUpProps {
email: string,
password: string,
firstname: string,
lastname: string
roles: string[]
}

export const signUp = createAsyncThunk<User, signUpProps,ThunkConfig<string>>(
    'login/signUp',
    async (newUserData, thunkAPI) => {
        const {dispatch, rejectWithValue, extra} = thunkAPI

        try {
            const reqBody = 
          {
              'query': 'mutation Mutation($data: UserInput) { signUp(data: $data) {  accessToken refreshToken userId } }',
              'operationName': 'Mutation',
              'variables': { 'data': {
                  'password': newUserData.password,
                  'email': newUserData.email,
                  'firstname': newUserData.firstname,
                  'lastname': newUserData.lastname ,
                  'roles': newUserData.roles
              }}
          }

            const response = await extra.api.post('/',reqBody)
            if (!response.data) {
                throw new Error('user not found')
            }

            await tokenService.setTokens(response.data.data.signUp)
         

            dispatch(userAction.setAuthData(response.data.data.signUp))

            return response.data.data.signUp
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)