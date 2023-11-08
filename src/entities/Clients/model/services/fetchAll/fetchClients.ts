import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { DataWithHeader } from '../../types/clientsSchema'


export type filterData = {
  userId: string,
  page?: string,
  limit?: string
}
export const fetchClients = createAsyncThunk<DataWithHeader, filterData,ThunkConfig<string>>(
    'clients/fetchClients',
    // @ts-ignore
    async ({userId, page= '2', limit = '2'}, thunkAPI): Promise<DataWithHeader | RejectWithValue<string, unknown>> => {
        const {rejectWithValue, extra} = thunkAPI
        try {
            const response = await extra.api.get<DataWithHeader>(`/clients?userId=${userId}&_page=${page}&_limit=${limit}`)
            if (!response.data) {
                throw new Error('err')
            }
            return {data: response.data, total: response.headers['x-total-count']}
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)