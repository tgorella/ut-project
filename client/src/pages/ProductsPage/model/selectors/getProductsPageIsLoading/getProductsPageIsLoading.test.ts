import { StateSchema } from 'app/providers/StoreProvider'
import { getProductsPageIsLoading } from './getProductsPageIsLoading'

describe('getProductsPageIsLoading.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            productPage: {
                isLoading: true
            }
        }

        expect(getProductsPageIsLoading(state as StateSchema)).toEqual(true)
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema>={}
        expect(getProductsPageIsLoading(state as StateSchema)).toEqual(undefined)
    })
})