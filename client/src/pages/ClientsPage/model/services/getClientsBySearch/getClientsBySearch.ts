import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Client } from '../../../../../entities/Clients/model/types/clientSchema'
import i18n from 'shared/config/i18n/i18n'

export type FilterProps = {
  text: string | number
}
export const getClientsBySearch = createAsyncThunk<Client[], string ,ThunkConfig<string>>(
    'clients/getClientsBySearch',
    async (text, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'query Query($data: String) { filteredClients(data: $data) { _id email avatarUrls name profession } }',
                'operation-name':'Query',
                'variables': {'data': text}
            })
            // const foundedData = data.filter((item: Client) => item.name?.toLowerCase()?.includes(text.toLowerCase()) || item.email?.toLowerCase().includes(text.toLowerCase()) || item.phone?.includes(text))
            if (!data) {
                return rejectWithValue(i18n.t('Клиент не найден'))
            }
            return data.data.filteredClients
        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)