import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Client } from '../../types/clientSchema'
import i18n from 'shared/config/i18n/i18n'
import httpService from 'shared/api/api'

export type FilterProps = {
  clientId: string,
  currentUserId: string
}
export const getClientById = createAsyncThunk<Client, FilterProps ,ThunkConfig<string>>(
    'clientDetails/getClientById',
    async (filter, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        const {clientId, currentUserId} = filter
        try {
            const response = await httpService.get<Client>(`/client/${clientId}`)
            console.log(response)
            if (response.data.userId !== currentUserId) {
                throw new Error('Клиент не найден')
            }
            if (!response.data) {
                throw new Error('err')
            }
            return response.data
        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)