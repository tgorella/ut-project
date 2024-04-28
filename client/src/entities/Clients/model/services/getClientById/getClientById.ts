import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Client } from '../../types/clientSchema'
import i18n from '@/shared/config/i18n/i18n'

export type FilterProps = {
  clientId: string,
  currentUserId: string
}
export const getClientById = createAsyncThunk<Client, FilterProps ,ThunkConfig<string>>(
    'clientDetails/getClientById',
    async (filter, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        const {clientId} = filter
        try {
            const {data} = await extra.api.post('/', {
                'query': 'query Query($clientId: ID) { client(id: $clientId) { _id address avatarUrls email isFav name notes phone profession } }',
                'operation-name':'Query',
                'variables': {'clientId': clientId}
            })

            return data.data.client

        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)