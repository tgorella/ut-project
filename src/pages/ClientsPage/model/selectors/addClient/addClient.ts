import { StateSchema } from 'app/providers/StoreProvider'

export const getAddClientAddedStatus = (state: StateSchema) => state.clientsPage?.clientAdded
export const getAddClientError = (state: StateSchema) => state.clientsPage?.clientAddError