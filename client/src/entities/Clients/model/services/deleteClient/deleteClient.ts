import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Client } from '../../types/clientSchema'
import i18n from '@/shared/config/i18n/i18n'
import { ClientsPageActions } from '@/pages/ClientsPage'

export type FilterProps = {
  clientId: string,
}
export const deleteClient = createAsyncThunk<Client, string ,ThunkConfig<string>>(
    'clientDetails/getClientById',
    async (clientId, thunkAPI) => {
        const {rejectWithValue, dispatch, extra} = thunkAPI
        try {
            const {data} = await extra.api.post('/', {
                'query': 'mutation Mutation($deleteClientId: ID) { deleteClient(id: $deleteClientId) }',
                'operationName': 'Mutation',
                'variables': {'deleteClientId': clientId }
            })

            if (!data) {
                throw new Error('err')
            }
           
            dispatch(ClientsPageActions.clientDeleted(clientId))

            return data.data.deleteClient

        } catch (error) {
            return rejectWithValue(i18n.t('Клиент не найден'))
        }
    }
)