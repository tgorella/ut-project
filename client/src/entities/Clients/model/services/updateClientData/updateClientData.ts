import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Client } from '../../types/clientSchema'
import { getClientDetailsForm } from '../../selectors/getClientDetailsForm/getClientDetailsForm'
import httpService from 'shared/api/api'


export const updateClientData = createAsyncThunk<Client, string,ThunkConfig<string>>(
    'clientDetails/updateClientData',
    async (id, thunkAPI) => {
        const {rejectWithValue, getState} = thunkAPI
        const formData = getClientDetailsForm(getState())
        try {
            const {data} = await httpService.patch<Client>(`/client/${id}`, formData)
            
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)