import { StateSchema } from 'app/providers/StoreProvider'

export const getOrderDetailsError = (state: StateSchema) => state.orderDetails?.error