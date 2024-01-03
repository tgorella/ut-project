import { StateSchema } from 'app/providers/StoreProvider'

export const getAddOrderAddedStatus = (state: StateSchema) => state.addOrderButton?.added
export const getAddOrderError = (state: StateSchema) => state.addOrderButton?.error
