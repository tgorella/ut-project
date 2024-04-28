import { StateSchema } from '@/app/providers/StoreProvider'
import { getOrderDetailsIsLoading } from './getOrderDetailsIsLoading'

describe('getOrderDetailsError.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            orderDetails: {
                isLoading: true
            }
        }
        expect(getOrderDetailsIsLoading(state as StateSchema)).toEqual(true)
    })
    test('with empty', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getOrderDetailsIsLoading(state as StateSchema)).toEqual(undefined)
    })
})