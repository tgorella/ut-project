import { StateSchema } from '@/app/providers/StoreProvider'

export const getOrderStatusesError = (state: StateSchema) => state.orderStatuses?.error