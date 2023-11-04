import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Client } from '../../types/clientsSchema'


export const fetchClients = createAsyncThunk<Client[], void,ThunkConfig<string>>(
    'clients/fetchClients',
    async (_, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.get<Client[]>('/clients')
            console.log(data)
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)