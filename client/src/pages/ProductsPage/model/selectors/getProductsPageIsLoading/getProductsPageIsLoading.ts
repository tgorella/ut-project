import { StateSchema } from 'app/providers/StoreProvider'

export const getProductsPageIsLoading = (state: StateSchema) => state.productPage?.isLoading