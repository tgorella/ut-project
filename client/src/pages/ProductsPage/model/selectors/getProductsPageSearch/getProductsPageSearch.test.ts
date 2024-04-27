import { StateSchema } from 'app/providers/StoreProvider'
import { getProductsPageSearch } from './getProductsPageSearch'

describe('getProductsPageSearch.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            productPage: {
                search: 'test'
            }
        }
        expect(getProductsPageSearch(state as StateSchema)).toEqual('test')
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProductsPageSearch(state as StateSchema)).toEqual(undefined)
    })
})