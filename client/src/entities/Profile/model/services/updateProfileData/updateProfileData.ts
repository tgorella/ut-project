import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile } from '../../types/profileSchema'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'


export const updateProfileData = createAsyncThunk<Profile, void,ThunkConfig<string>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const {rejectWithValue, getState, extra} = thunkAPI
        const formData = getProfileForm(getState())
        try {
            const newData = formData
            delete newData?.newPassword
            delete newData?.repeatPassword

            const {data} = await extra.api.post('/', {
                'query': 'mutation Mutation($data: UserNewDataInput) { updateUser(data: $data) { _id avatar city currency country email firstname lastOrderNumber lastname username } }',
                'operation-name': 'Mutation',
                'variables': {'data': newData}
            })

            if (!data) {
                throw new Error('err')
            }
            return data.data.updateUser
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)