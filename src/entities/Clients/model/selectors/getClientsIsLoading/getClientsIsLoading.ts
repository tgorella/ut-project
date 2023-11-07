import { StateSchema } from 'app/providers/StoreProvider'

export const getClientIsLoading = (state: StateSchema) => state.clients?.isLoading