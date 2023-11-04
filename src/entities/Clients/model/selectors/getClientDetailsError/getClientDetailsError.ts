import { StateSchema } from 'app/providers/StoreProvider'

export const getClientDetailsError = (state: StateSchema) => state.clientDetails?.error