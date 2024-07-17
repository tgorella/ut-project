import { StateSchema } from '@/app/providers/StoreProvider'

export const getEventError = (state: StateSchema) => state.eventDetails?.error