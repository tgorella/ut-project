import { StateSchema } from 'app/providers/StoreProvider'
import { getOrderDetailsError } from './getOrderDetailsError'

describe('getOrderDetailsError.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            orderDetails: {
                error: 'error'
            }
        }
        expect(getOrderDetailsError(state as StateSchema)).toEqual('error')
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getOrderDetailsError(state as StateSchema)).toEqual(undefined)
    })
})