import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Client } from '../../../../../entities/Clients/model/types/clientSchema'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'

export type FilterProps = {
  text: string | number
}
export const getClientsBySearch = createAsyncThunk<Client[], string ,ThunkConfig<string>>(
    'clients/getClientsBySearch',
    async (text, thunkAPI) => {
        const {rejectWithValue, extra, getState} = thunkAPI
        const userData = getUserAuthData(getState())
        try {
            const {data} = await extra.api.get<Client[]>(`/clients?userId=${userData?.id}`, {
                params: {
                    q: text
                }
            })
            // const foundedData = data.filter((item) => item.name?.toLowerCase()?.includes(text.toLowerCase()) || item.email?.toLowerCase().includes(text.toLowerCase()) || item.phone?.includes(text))
            
            if (!data) {
                return rejectWithValue(i18n.t('Клиент не найден'))
            }
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)