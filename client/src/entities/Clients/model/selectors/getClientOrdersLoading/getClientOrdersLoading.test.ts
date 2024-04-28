import { StateSchema } from '@/app/providers/StoreProvider'
import { getClientOrdersLoading } from './getClientOrdersLoading'

describe('getClientOrdersLoading.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            clientDetails: {
                ordersLoading: true
            }
        }

        expect(getClientOrdersLoading(state as StateSchema)).toEqual(true)
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getClientOrdersLoading(state as StateSchema)).toEqual(undefined)
    })
})