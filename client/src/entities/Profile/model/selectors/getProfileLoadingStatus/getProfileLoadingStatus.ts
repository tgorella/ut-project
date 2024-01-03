import { StateSchema } from 'app/providers/StoreProvider'

export const getProfileLoadingStatus = (state: StateSchema) => state.profile?.isLoading