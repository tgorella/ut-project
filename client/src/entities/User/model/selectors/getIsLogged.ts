import type { StateSchema } from '@/app/providers/StoreProvider'

export const getIsLogged = (state: StateSchema) => state?.user?.isLogged