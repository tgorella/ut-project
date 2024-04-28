import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { Client } from '@/entities/Clients'

export type filterData = {
  userId: string,
  page?: string,
  limit?: string
}
export const fetchClients = createAsyncThunk<Client[], void,ThunkConfig<string>>(
    'clients/fetchClients',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'query Query { clients { _id email name avatarUrls profession } }',
                'operation-name':'Query'
            })
            if (!data) {
                throw new Error('err')
            }
            return data.data.clients
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)