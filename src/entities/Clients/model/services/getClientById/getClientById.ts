import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Client } from '../../types/clientsSchema'
import i18n from 'shared/config/i18n/i18n'


export const getClientById = createAsyncThunk<Client, string ,ThunkConfig<string>>(
    'clientDetails/getClientById',
    async (id, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.get<Client>(`/clients/${id}`)
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