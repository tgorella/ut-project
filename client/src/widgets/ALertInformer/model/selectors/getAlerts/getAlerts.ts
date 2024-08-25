import { StateSchema } from '@/app/providers/StoreProvider'

export const getAlerts = (state: StateSchema) => state.alertInformer.messages