import { StateSchema } from 'app/providers/StoreProvider'
import { getOrderStatusesIsLoading } from './getOrderStatusesIsLoading'

describe('getOrderStatusesIsLoading.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            orderStatuses: {
                isLoading: true
            }
        }
        expect(getOrderStatusesIsLoading(state as StateSchema)).toEqual(true)
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getOrderStatusesIsLoading(state as StateSchema)).toEqual(undefined)
    })
})