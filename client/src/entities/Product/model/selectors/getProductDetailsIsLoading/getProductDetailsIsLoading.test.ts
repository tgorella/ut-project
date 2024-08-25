import { StateSchema } from '@/app/providers/StoreProvider'
import {getProductDetailsIsLoading } from './getProductDetailsIsLoading'

describe('getProductDetailIsLoading.test', () => {
    test('should return value', () => {
        const state : DeepPartial<StateSchema> = {
            productDetails: {
                isLoading: false
            }
        }
        expect(getProductDetailsIsLoading(state as StateSchema)).toEqual(false)
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProductDetailsIsLoading(state as StateSchema)).toEqual(undefined)
    })
})