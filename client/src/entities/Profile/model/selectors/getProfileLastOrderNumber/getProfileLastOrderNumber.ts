import { StateSchema } from 'app/providers/StoreProvider'

export const getProfileLastOrderNumber = (state: StateSchema) => state.profile?.data?.lastOrderNumber