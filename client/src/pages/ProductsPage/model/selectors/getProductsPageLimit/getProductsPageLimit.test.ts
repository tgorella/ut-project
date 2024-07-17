import { StateSchema } from '@/app/providers/StoreProvider'
import { getProductsPageLimit } from './getProductsPageLimit'

describe('getProductsPageLimit.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            productPage: {
                limit: 100
            }
        }

        expect(getProductsPageLimit(state as StateSchema)).toEqual(100) 
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProductsPageLimit(state as StateSchema)).toEqual(undefined)
    })
})