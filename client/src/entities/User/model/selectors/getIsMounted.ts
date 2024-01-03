import type { StateSchema } from 'app/providers/StoreProvider'

export const getIsMounted = (state: StateSchema) => state.user?.mounted