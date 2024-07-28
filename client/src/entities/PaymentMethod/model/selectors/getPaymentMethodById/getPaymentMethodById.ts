import { StateSchema } from '@/app/providers/StoreProvider'

export const getPaymentMethodById = (id: string) => (state: StateSchema) => state.paymentMethods?.data?.find((el) => el._id === id)