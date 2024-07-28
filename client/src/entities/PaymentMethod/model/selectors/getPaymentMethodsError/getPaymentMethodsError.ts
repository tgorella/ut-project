import { StateSchema } from '@/app/providers/StoreProvider'

export const getPaymentMethodsError = (state: StateSchema) => state.paymentMethods?.error