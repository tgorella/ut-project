import { StateSchema } from '@/app/providers/StoreProvider'
import { getProductDetailsError } from './getProductDetailsError'

describe('getProductDetailsError.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            productDetails: {
                error: 'error'
            }
        }
        expect(getProductDetailsError(state as StateSchema)).toEqual('error')
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProductDetailsError(state as StateSchema)).toEqual(undefined)
    })
})