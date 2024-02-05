import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Client } from '../../types/clientSchema'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import { ClientsPageActions } from 'pages/ClientsPage'
import httpService from 'shared/api/api'

export type FilterProps = {
  clientId: string,
}
export const deleteClient = createAsyncThunk<Client, string ,ThunkConfig<string>>(
    'clientDetails/getClientById',
    async (clientId, thunkAPI) => {
        const {rejectWithValue, getState, dispatch} = thunkAPI
        const userData = getUserAuthData(getState())
        try {
            const {data} = await httpService.get<Client>(`/clients/${clientId}`)
            if (data.userId !== userData?._id) {
                throw new Error('Нет доступа')
            }
            if (!data) {
                throw new Error('err')
            }
            const response = await httpService.delete(`/clients/${clientId}`)
            dispatch(ClientsPageActions.clientDeleted(clientId))
            return response.data

        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)