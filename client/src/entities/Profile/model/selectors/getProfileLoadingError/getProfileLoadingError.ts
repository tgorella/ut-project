import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileLoadingError = (state: StateSchema) => state.profile?.error