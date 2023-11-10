import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Client } from '../../types/clientsSchema'


export type filterData = {
  userId: string,
  page?: string,
  limit?: string
}
export const fetchClients = createAsyncThunk<Client[], string,ThunkConfig<string>>(
    'clients/fetchClients',
    // @ts-ignore
    async (userId, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.get<Client[]>(`/clients?userId=${userId}`)
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)