import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Client } from '../../types/clientsSchema'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'

export type FilterProps = {
  text: string
}
export const getClientsBySearch = createAsyncThunk<Client[], string ,ThunkConfig<string>>(
    'clients/getClientsBySearch',
    async (text, thunkAPI) => {
        const {rejectWithValue, extra, getState} = thunkAPI
        const userData = getUserAuthData(getState())
        try {
            const {data} = await extra.api.get<Client[]>(`/clients?userId=${userData?.id}`)
            const foundedData = data.filter((item) => item.name?.toLowerCase()?.includes(text.toLowerCase()) || item.email?.toLowerCase().includes(text.toLowerCase()))
            
            if (!data) {
                return rejectWithValue(i18n.t('Клиент не найден'))
            }
            return foundedData
        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)