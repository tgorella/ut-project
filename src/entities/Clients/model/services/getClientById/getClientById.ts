import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Client } from '../../types/clientSchema'
import i18n from 'shared/config/i18n/i18n'

export type FilterProps = {
  clientId: string,
  currentUserId: string
}
export const getClientById = createAsyncThunk<Client, FilterProps ,ThunkConfig<string>>(
    'clientDetails/getClientById',
    async (filter, thunkAPI) => {
        const {rejectWithValue, extra} = thunkAPI
        const {clientId, currentUserId} = filter
        try {
            const {data} = await extra.api.get<Client>(`/clients/${clientId}`)
            if (data.userId !== currentUserId) {
                throw new Error('Клиент не найден')
            }
            if (!data) {
                throw new Error('err')
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)