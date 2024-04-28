import { StateSchema } from '@/app/providers/StoreProvider'

export const getAddClientAddedStatus = (state: StateSchema) => state.addClientButton?.added
export const getAddClientError = (state: StateSchema) => state.addClientButton?.error
