import { StateSchema } from 'app/providers/StoreProvider'

export const getClientError = (state: StateSchema) => state.clients?.error