import { StateSchema } from '@/app/providers/StoreProvider'
import { getProductsPageError } from './getProductsPageError'

describe('getProductsPageError.test', () => {
    test('should return value', () => {
        const state:DeepPartial<StateSchema> = {
            productPage: {
                error: 'error'
            }
        }
        expect(getProductsPageError(state as StateSchema)).toEqual('error')
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProductsPageError(state as StateSchema)).toEqual(undefined)
    })
})