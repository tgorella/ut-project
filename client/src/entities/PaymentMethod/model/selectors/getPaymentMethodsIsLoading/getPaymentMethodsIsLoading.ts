import { StateSchema } from '@/app/providers/StoreProvider'

export const getPaymentMethodsIsLoading = (state: StateSchema) => state.paymentMethods?.isLoading