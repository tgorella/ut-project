import { StateSchema } from '@/app/providers/StoreProvider'
import { getProfileLastOrderNumber } from './getProfileLastOrderNumber'

describe('getProfileLastOrderNumber.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    lastOrderNumber: '123'
                }
            }
        }
        expect(getProfileLastOrderNumber(state as StateSchema)).toEqual('123')
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileLastOrderNumber(state as StateSchema)).toEqual(undefined)
    })
})